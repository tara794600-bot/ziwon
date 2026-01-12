import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Firestore Admin 초기화 (중복 방지)
if (!getApps().length) {
  console.log("🔥 Firebase Admin 초기화 시작");
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  console.log("🚀 API 호출됨:", req.method);

  if (req.method !== "POST") {
    console.log("❌ POST 아님");
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { name, phone } = req.body;
    console.log("📥 받은 데이터:", { name, phone });

    if (!name || !phone) {
      console.log("❌ 입력값 부족");
      return res.status(400).json({ error: "입력값 부족" });
    }

    // 🔥 IP 추출
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "unknown";

    console.log("🌐 IP:", ip);

    // 🔥 화이트리스트
    const whiteList = process.env.IP_WHITELIST
      ? process.env.IP_WHITELIST.split(",").map((v) => v.trim())
      : [];

    const isWhiteListed = whiteList.includes(ip);
    console.log("✅ 화이트리스트 여부:", isWhiteListed);

    if (!isWhiteListed) {
      const ipDoc = await db.collection("ipRecords").doc(ip).get();
      console.log("📄 IP 기록 존재:", ipDoc.exists);

      if (ipDoc.exists) {
        console.log("⛔ 중복 IP 차단");
        return res.status(403).json({
          error: "이미 신청이 완료된 IP입니다.",
        });
      }

      await db.collection("ipRecords").doc(ip).set({
        createdAt: new Date(),
      });

      console.log("📝 IP 기록 저장 완료");
    }

    // 🔥 Firestore 저장
    await db.collection("consultRequests").add({
      name,
      phone,
      ip,
      createdAt: new Date(),
    });

    console.log("💾 상담 데이터 저장 완료");

    // 🔥 텔레그램 알림
    const token = process.env.TG_TOKEN;
    const adminIds = [process.env.ADMIN_IDS];

    console.log("📨 텔레그램 토큰 존재:", !!token);
    console.log("📨 관리자 ID:", adminIds);

    const text =
      "📢 신규 접수 알림\n\n" +
      `👤 이름: ${name}\n` +
      `📱 연락처: ${phone}\n` +
      `🌐 IP: ${ip}`;

    for (const id of adminIds) {
      console.log("➡️ 텔레그램 전송 시도:", id);

      const tgRes = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: id,
            text,
          }),
        }
      );

      const tgResult = await tgRes.json();
      console.log("📬 텔레그램 응답:", tgResult);

      if (!tgResult.ok) {
        throw new Error(
          "텔레그램 전송 실패: " + tgResult.description
        );
      }
    }

    // 🔥 Google Sheets
    if (process.env.SHEET_ID) {
      console.log("📊 Google Sheets 저장 시작");
      await saveToSheet({ name, phone });
      console.log("📊 Google Sheets 저장 완료");
    }

    console.log("✅ 전체 처리 완료");
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("🔥 서버 에러:", err);
    return res.status(500).json({ error: err.message });
  }
}

// 🔥 Google Sheets 기록 함수
async function saveToSheet({ name, phone }) {
  const { google } = await import("googleapis");

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.FIREBASE_ADMIN_KEY),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toLocaleString("ko-KR"),
    name,
    phone,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "시트1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}
