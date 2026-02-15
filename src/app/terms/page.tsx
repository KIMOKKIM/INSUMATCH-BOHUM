export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">이용약관</h1>
      
      <div className="prose max-w-none text-gray-600 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">제1조 (목적)</h2>
          <p>
            본 약관은 (주)리치골든파트너(이하 "회사")가 운영하는 Insumatch 사이트(이하 "사이트")에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 사이트와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">제2조 (정의)</h2>
          <p>
            1. "사이트"란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.<br/>
            2. "이용자"란 사이트에 접속하여 이 약관에 따라 사이트가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">제3조 (약관의 명시와 개정)</h2>
          <p>
            회사는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 알 수 있도록 사이트의 초기 서비스화면에 게시합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">제4조 (서비스의 제공 및 변경)</h2>
          <p>
            사이트는 다음과 같은 업무를 수행합니다.<br/>
            1. 구인/구직 정보의 제공<br/>
            2. 인재 정보의 열람 서비스<br/>
            3. 기타 사이트가 정하는 업무
          </p>
        </section>
        
        <div className="bg-gray-50 p-4 rounded text-sm text-gray-500 mt-8">
          * 본 약관은 예시이며, 실제 운영 시에는 법률 전문가의 검토를 받은 정식 약관을 사용해야 합니다.
        </div>
      </div>
    </div>
  );
}
