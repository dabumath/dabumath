export default function WelcomePage() {
  return (
    <main className="welcome-page">
      <section className="welcome-panel">
        <span className="welcome-mark" aria-hidden="true" />
        <p className="eyebrow">DABU MATH STUDENT</p>
        <h1>
          생각을 가르치는
          <br />
          수학.
        </h1>
        <p>
          선생님께 전달받은 수업 주소로 접속해 주세요.
          <br />
          각 수업 페이지에는 별도의 입장 코드가 필요합니다.
        </p>
        <div className="welcome-help">
          주소나 입장 코드를 잊었다면 담당 선생님에게 문의해 주세요.
        </div>
      </section>
    </main>
  );
}
