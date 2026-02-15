export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">개인정보처리방침</h1>
      
      <div className="prose max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">1. 개인정보의 처리 목적</h2>
          <p>
            Insumatch은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>회원 가입 및 관리</li>
            <li>재화 또는 서비스 제공 (채용 공고 등록, 입사 지원 등)</li>
            <li>고충처리 및 민원상담</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">2. 개인정보의 처리 및 보유 기간</h2>
          <p>
            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>회원 가입 및 관리 : 회원 탈퇴 시까지</li>
            <li>전자상거래 등에서의 소비자 보호에 관한 법률에 따른 기록 : 5년</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">3. 정보주체의 권리, 의무 및 그 행사방법</h2>
          <p>
            이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>개인정보 열람요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제요구</li>
            <li>처리정지 요구</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">4. 개인정보 보호책임자</h2>
          <p>
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="bg-gray-100 p-4 rounded mt-2">
            <p><strong>성명:</strong> 김효은</p>
            <p><strong>직책:</strong> 개인정보 관리 담당자</p>
            <p><strong>연락처:</strong> 02-1877-3407, good78man@naver.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}
