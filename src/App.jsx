import "./App.css";
import { useEffect} from 'react';
import 상담신청 from "./이미지/상담신청.png";
import 세이브 from "./이미지/세이브.png";
import 일번 from "./이미지/일번.png";
import 인간 from "./이미지/dlsrks.png";
import 육번 from "./이미지/육번.gif";
import 진행전 from "./이미지/진행 전.png";
import 진행후 from "./이미지/진행 후.png";
import 화살표 from "./이미지/화살표.png";
import 플라스 from "./이미지/플라스.png";
import 첫세이브론 from "./이미지/첫세이브론.jpg";

const data = [
  { product: "직장인대환대출", condition: "35세 / 직장인 / 신용점수 772점", amount: "7,811만원" },
  { product: "직장인대환대출", condition: "48세 / 직장인 / 신용점수 831점", amount: "6,320만원" },
  { product: "직장인대환대출", condition: "35세 /프리랜서  / 신용점수 783점", amount: "8,200만원" },
  { product: "직장인대환대출", condition: "50세 / 직장인 / 신용점수 764점", amount: "7,542만원" },
  { product: "직장인대환대출", condition: "42세 / 직장인 / 신용점수 810점", amount: "8,090만원" },
  { product: "직장인대환대출", condition: "47세 / 프리랜서  / 신용점수 797점", amount: "5,460만원" },
  { product: "직장인대환대출", condition: "39세 / 직장인 / 신용점수 785점", amount: "3,108만원" },
  { product: "직장인대환대출", condition: "28세 / 직장인 / 신용점수 672점", amount: "4,780만원" },
  { product: "직장인대환대출", condition: "31세 / 직장인 / 신용점수 791점", amount: "9,280만원" },
  { product: "직장인대환대출", condition: "62세 / 프리랜서 / 신용점수 613점", amount: "6,718만원" },
];

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}





export default function App() {

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
  const delay = entry.target.dataset.delay || 0;

  setTimeout(() => {
    entry.target.classList.add("show");
  }, delay);

  observer.unobserve(entry.target);
}

          else {
            // 👇 화면에서 사라지면 show 제거 → 다시 실행 가능
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2 }
    );
        const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  return (
    <div className="app">
      {/* ================== HERO ================== */}
      <header className="첫화면 hidden" > <img src={세이브} alt="첫세이브론"className="세이브" />
        <div className="inner 첫화면-inner">
       

          <p className="이자">이자 걱정, 이제 그만!</p>
          <p className="이자1">
            최대 <span className="억">3억</span>까지 채무통합
          </p>

          <div className="일번">
            <img src={일번} alt="혜택 안내" />
          </div>

          <div className="상담신청">
            <button className="처음처럼"onClick={()=>scrollToSection("롱메")}><img src={상담신청} alt="상담 신청" /></button>
          </div>
        </div>
      </header>

      {/* ================== 고객 사례 ================== */}
      <section className="고객사례 hidden" >
        <div className="inner 고객사례-inner">
          <div className="두달락">
            <div className="이미지">
              <img src={인간} className="인간" alt="고객 사례" />
              <h2 className="김땡땡">김OO</h2>

              <div className="중소">
                <p>중소기업근로자 / 연봉 5천</p>
                <p>고금리 기대출로 신청</p>
              </div>

              <div className="통합">
                <p>월 50만원 절약</p>
                <p className="메롱">   <img src={플라스}className="플라스" alt="플라스"/> <span className="시옷">생계 여유자금 발생</span></p>
              </div>
            </div>

            <div className="대박표">
              <img src={진행전} className="진행전 hidden" data-delay="0" alt="진행 전" />
              <img src={화살표} className="화살표 hidden"data-delay="500" alt="화살표" />
              <img src={진행후} className="진행후 hidden" data-delay="900" alt="진행 후" />
               <h2 className="고객 scale-up">※ 회생, 회복, 파산 최근 5년 이내 진행자는 진행 불가 ※</h2>
            </div> 
          </div>
        </div>
      </section>

      {/* ================== 진행절차 ================== */}
      <section className="정신 hidden">
        <div className="inner 정신-inner">
          <div className="삼번">
            <p className="진행1">채무통합</p>
            <p className="진행">진행절차를 모르시겠다고요?</p>

            <div className="묶음">
              <p className="본인">복잡한 본인의 대출현황을</p>
              <p className="간단">간단하고 안전하게</p>
              <p className="정리">정리해 드리겠습니다.</p>
            </div>

            <div className="후후에">
              <p>상담 후에 결정하셔도 충분합니다.</p>
              <p>단 한 번의 선택으로 10년이 편해집니다.</p>
            </div>
          </div>

          <div className="세입">
            <div className="세입-타이틀">
              <p className="론">세이브론의</p>
              <p className="론">빠르고 간편한</p>
              <p className="론">채무통합절차</p>
            </div>

            <div className="근로">
              <p>근로소득 2,000만원 이상</p>
              <p>채무 3,000만원 이상이면 가능</p>
              <p>상담부터 실행까지 원스톱</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================== 표 섹션 ================== */}
      <section className="사번섹션 hidden">
        <div className="사번">
          <p className="석세스"> CUSTOMER SUCCESS STORIES </p>
          <p className="담은"> 고객의 변화를 담은 성공사례를      </p>
          <p className="한눈"> 한눈에 확인해 보세요.    </p>
          <p className="단">단, 회생ㆍ회복ㆍ파산 진행이력이 5년 이내 있으면 진행이 불가합니다.</p>

          <div className="table-wrapper">
            <table className="approval-table">
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "45%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>승인상품</th>
                  <th>승인조건</th>
                  <th>승인금액</th>
                </tr>
              </thead>
            </table>

            <div className="rolling-body">
              <table className="approval-table">
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "45%" }} />
                  <col style={{ width: "25%" }} />
                </colgroup>

                <tbody>
                  {data.map((item, i) => (
                    <tr key={`a-${i}`}>
                      <td>{item.product}</td>
                      <td>{item.condition}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>

                <tbody>
                  {data.map((item, i) => (
                    <tr key={`b-${i}`}>
                      <td>{item.product}</td>
                      <td>{item.condition}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ================== 신청 섹션 ================== */}
      <section className="신청 hidden"id="롱메">
        <div className="inner 신청-inner">
          <h2 className="채무">채무통합 솔루션이 필요하세요?</h2>
          <div className="조회묶음">
            <p className="조회">신용조회 없는 1분 상담으로</p>
            <p className="조회">높은금리의 대출이자를 절반 이하로 줄여보세요.</p>
<div className="박스" >
<h2> 정확한 상담을 위한 </h2>
  <h2 className="사탕">고객정보를 입력해주세요.   </h2>

<form >                      
  <div className="상담">
<label>이름</label>
<input type="text" placeholder="이름을 입력하세요."required pattern="^[가-힣]{2,4}$"title="이름은 한글 2~4자로 입력해주세요"/></div>

<div className="상담">
<label>연락처</label>
<input type="tel" placeholder="연락처를 입력하세요."required pattern="^010[0-9]{4}[0-9]{4}$"title="010XXXXXXXX 형식으로 입력해주세요"/>
  </div>

 <button className="롱메"  type="submit">무료 상담신청</button>
  <div className="즉시"> 신청 즉시, 10분이내 유선 상담 진행</div>
  </form></div>




          </div>




        </div>
      </section>

      {/* ================== 마지막 이미지 ================== */}
      <section className="육번섹션 ">
        <div className="inner 육번-inner">
          <img src={육번} alt="마무리 배너" className="육번" />
        </div>
      </section>
    </div>
  );
}
