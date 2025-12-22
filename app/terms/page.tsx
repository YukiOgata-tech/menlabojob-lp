import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "利用規約 | メンラボジョブ",
  description: "メンラボジョブの利用規約をご確認ください。",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <Container className="py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/menlabjob_lp_header.webp"
                alt="メンラボジョブ by Mental Health Labo"
                width={280}
                height={64}
                className="h-12 w-auto sm:h-14"
                priority
              />
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                トップに戻る
              </Button>
            </Link>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg sm:p-12">
            <h1 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">
              メンラボジョブ利用規約
            </h1>

            <div className="space-y-8 text-foreground">
              <p className="leading-relaxed">
                メンラボジョブ利用規約（以下「本規約」といいます。）は、メンタルヘルスラボ株式会社（以下「当社」といいます。）が運営する求人マッチングサービス「メンラボジョブ」（ http://menlabojob.mentalhealthlabo.co.jp/ ）及び当該サイトに付随するその他の各種サービス（以下「本サービス」といいます。）について、本サービスを利用する個人（以下「ユーザー」といいます。）に遵守いただきたい事項および当社との権利義務関係を定めたものです。本サービスを利用する場合、ユーザーは、本規約及び「メンタルヘルスラボ個人情報保護方針」の内容を全て承諾したものとし、当社は、メンラボジョブが利用された時点でユーザーが規約等に同意したものとみなします。
              </p>

              <section>
                <h2 className="mb-4 text-xl font-bold">第1条（定義）</h2>
                <ul className="list-inside list-disc space-y-2 leading-relaxed">
                  <li>「本サービス」とは、当社が提供する求人マッチングサービス「メンラボジョブ」及び当該サイトに付随するその他の各種サービスをいいます。</li>
                  <li>「本サイト」とは、そのドメインが「 http://menlabojob.mentalhealthlabo.co.jp/ 」である当社が運営するウェブサイトをいいます。</li>
                  <li>「ユーザー」とは、本サービスを利用する個人の総称を指します。</li>
                  <li>「求人掲載事業者」とは、採用を希望し当社と契約している事業者のことを指します。</li>
                  <li>「スカウトメッセージ」とは、本サービス上において、スカウトルーム上で、求人掲載事業者が、業務委託先候補または雇入れ候補として連絡をする目的で送信するメッセージをいいます。</li>
                  <li>「知的財産権」とは、著作権（著作権法第27条および第28条に定める権利を含みます。）、商標権、特許権、実用新案権、意匠権その他の知的財産権をいいます。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第2条（会員登録および本サービスの利用）</h2>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>本サービスの利用を希望する個人は、本規約に同意のうえで会員登録を行うことで、本サービスを利用することができます。</li>
                  <li>当社は、会員登録に関して、明らかに虚偽である情報または悪意をもって入力された情報は、当社の裁量によって修正または削除することができるものとします。</li>
                  <li>ユーザーは、ログインID及びパスワードの管理責任を負うものとし、漏えいや使用上の過誤等によるユーザーの損害について、当社は一切の責任を負わないものとします。</li>
                  <li>ユーザーは、ログインID及びパスワードを複数取得することや第三者に譲渡、貸与してはならないものとします。</li>
                  <li>当社は、ユーザーが本規約に違反していると判断した場合、事前の通知なく、会員から除名又は本サービスの利用を停止することができるものとします。</li>
                  <li>ユーザーは、本サービスを全て無料で利用することができます。</li>
                  <li>ユーザーは、当社が、当社に関する広告または宣伝等を、その登録したメールアドレス宛に送信することに同意のうえ、本サービスを利用するものとします。</li>
                  <li>ユーザーは、求人掲載事業者が、自己に対して本サービス上において、メッセージを送信することに同意のうえ、本サービスを利用するものとします。</li>
                  <li>ユーザーは、本サービスを求職活動のみを目的に利用することとし、営業活動等営利目的で利用してはならないものとします。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第3条（保証）</h2>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>ユーザーは、会員登録をする際に入力した情報が最新、正確かつ真実であることを保証します。</li>
                  <li>ユーザーは、副業を行う際に届出義務等の社内手続が必要な場合には当該手続を適正に行っていることを保証します。</li>
                  <li>ユーザーは、本サービスの利用において、自身の情報および求人掲載事業者との連絡等に起因して生じた一切の紛争、クレーム等に関し、自己の費用および責任をもって対応するものとし、当社に迷惑および損害を与えないことを保証します。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第4条（禁止事項）</h2>
                <p className="mb-4 leading-relaxed">
                  ユーザーは、本サービスの利用にあたり、自己または第三者を利用して以下の各号のいずれかに該当する行為をしてはなりません。当社は、ユーザーが以下の各号のいずれかに該当する行為をしたと判断した場合、何らの催告を経ずに、当該ユーザーのアカウントの機能を停止することができます。
                </p>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>本規約に違反する行為</li>
                  <li>法令等、条例に違反する行為または公序良俗に反する行為</li>
                  <li>当社又は第三者に対する暴力的な言動、不当な要求又はそれらに類する行為</li>
                  <li>当社または第三者の知的財産権、肖像権、プライバシー権、名誉その他の権利を侵害するまたはそのおそれのある行為</li>
                  <li>当社又は第三者を差別、批判、攻撃、誹謗中傷等する行為</li>
                  <li>当社に対し、または本サービス上において、虚偽の事実を述べ、または記載する行為</li>
                  <li>応募先からの連絡又は書類提出の要請を無視する行為</li>
                  <li>本サービスを通じて採用を行った事実を秘匿しようとする行為等の求人者の不正行為に協力する行為（ただしユーザーが当社に対し、求人者の不正行為の事実を申告した場合には、当該ユーザーはその責任を負わないものとします。）</li>
                  <li>求人掲載事業者に対しての迷惑行為</li>
                  <li>本サービスで得た情報を複製、販売、出版する等私的利用の範囲を超えて使用する行為</li>
                  <li>不正アクセス等本サービスの運営を妨げる行為</li>
                  <li>本サービスに関する当社またはユーザーの情報を改ざんする行為、当社の管理するシステム、サーバー、ネットワークその他の機能を破壊もしくは妨害し、または、不必要に過度の負担をかける行為</li>
                  <li>コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報を送信する行為</li>
                  <li>本サービスに関連するシステム、サーバー、ネットワーク等のエラー、バグ、セキュリティホールその他の瑕疵を利用する行為</li>
                  <li>本サービスに関するデータ等を取得するために、ロボット、クローラー、スクレイパーその他の自動的手段を使用する行為</li>
                  <li>本サービスの提供および運営を妨害するおそれのある行為</li>
                  <li>宗教活動または宗教団体への勧誘行為</li>
                  <li>反社会的勢力等に対して勢力に対して直接または間接に利益を供与する行為またはこれに関連する行為</li>
                  <li>その他当社が不適切と判断する行為</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第6条（個人情報の取扱い）</h2>

                <h3 className="mb-2 mt-4 text-lg font-semibold">1. ユーザーの個人情報の利用目的</h3>
                <ul className="list-inside list-disc space-y-2 leading-relaxed">
                  <li>お問合せに対する回答、相談</li>
                  <li>ご連絡、お知らせ</li>
                  <li>個人認証</li>
                  <li>ユーザーが問合せをした企業への提供</li>
                  <li>事業運営のため、保護措置を講じた上での外部委託</li>
                </ul>

                <h3 className="mb-2 mt-4 text-lg font-semibold">2. 提供情報の利用</h3>
                <p className="leading-relaxed">
                  当社は「メンタルヘルスラボ個人情報保護方針」で定義される個人情報以外の登録情報または本サービスの利用情報を利用できるものとします。
                </p>

                <h3 className="mb-2 mt-4 text-lg font-semibold">3. 外部委託先との機密保持契約について</h3>
                <p className="leading-relaxed">
                  当社は、システムの保守、改修等の業務を外部に委託することがあります。その場合、当社で定める個人情報保護管理体制の水準を満たした委託先を選定し、機密保持契約を結んだ上で委託します。
                </p>

                <h3 className="mb-2 mt-4 text-lg font-semibold">4. 個人情報の第三者提供</h3>
                <p className="mb-2 leading-relaxed">
                  当社は、ユーザーの許可なく第三者に個人情報を開示することは原則としてありません。ただし、以下の場合は、関係法令に反しない範囲で、利用者の同意なく個人情報を提供することがあります。
                </p>
                <ul className="list-inside list-disc space-y-2 leading-relaxed">
                  <li>別途本人の同意を得た場合</li>
                  <li>当社の提供するサービスに関して当社と契約を締結した又は当社に申込を行ったものに対して、当該サービスの利用のために開示する場合</li>
                  <li>外部サービスとの連携のために共有する場合</li>
                  <li>第三者広告主に共有する場合</li>
                  <li>法律上の理由により開示する場合</li>
                  <li>業務上必要な範囲内で、メンタルヘルスラボグループ子会社または業務委託先に開示・提供する場合</li>
                  <li>合併、吸収分割又は事業譲渡その他の理由により個人情報を含む事業の承継がなされる場合</li>
                  <li>裁判所、行政機関、その他これに準じる機関が法律に基づいて当社に情報の開示を請求する場合</li>
                  <li>ユーザーが犯罪行為に関わり、又は第三者の権利を侵害している等、当社が当該ユーザーに関する情報提供をもって公的機関を含む第三者に通報又は報告することを相当であると判断する場合</li>
                </ul>

                <p className="mt-4 leading-relaxed">
                  5. 当社は、前項に基づき行った情報提供について、ユーザーに対し、一切の責任を負わないものとします。
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第7条（通信の秘密）</h2>
                <p className="leading-relaxed">
                  当社は、ユーザーの通信の秘密を守って、ユーザーの通信内容や通信履歴等を取扱います。なお、当社は、ユーザーの同意を得た場合や法令により強制または許容される場合に、ユーザーの通信内容や通信履歴等を閲覧し、捜査機関等の第三者に開示し、または削除することがあります。
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第8条（知的財産権）</h2>
                <p className="leading-relaxed">
                  本サービスおよび本サイト上で当社が提供する文章、画像、動画、ロゴ、デザイン、構成、プログラム、ソースコードその他一切のデータおよび情報の知的財産権は、当社または当該権利を正当に有する第三者に帰属するものとします。
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第9条（解約）</h2>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>ユーザーは、当社所定の手続に基づき、本サービスを解約することができます。</li>
                  <li>解約をしたユーザーがその後本サービスを再度利用する場合、退会前に掲載していた情報等を引き継ぐことはできません。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第10条（変更・削除等）</h2>
                <p className="leading-relaxed">
                  1. 当社は、ユーザーが以下各号のいずれかに該当する場合、何らの催告を経ずに、当該ユーザーの情報を変更・削除等の措置を講ずることができます。なお、以下の措置によりユーザーが損害を受けた場合であっても、当社は一切の責任を負わないものとします。
                </p>
                <ul className="mt-2 list-inside list-disc space-y-2 leading-relaxed">
                  <li>本規約に違反したとき</li>
                  <li>その他本サービスのユーザーとして不適切であると当社が認めるとき</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第11条（本サービスの変更、停止等）</h2>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>当社は、ユーザーへの事前の通知なくして、任意に本サービスの内容や仕様の変更を行うことができるものとします。</li>
                  <li>当社は、次の各号のいずれかに該当する場合には、ユーザーへの事前の通知なくして、本サービスの提供を停止、終了または運営方法の変更をすることができるものとします。
                    <ul className="ml-6 mt-2 list-inside list-disc space-y-2">
                      <li>本サービスの提供に係るシステムの点検または保守作業を定期的または緊急に行う場合</li>
                      <li>コンピューター、通信回線等が事故または第三者の故意に基づく行為により停止した場合</li>
                      <li>地震、火災、停電、洪水、津波等の天災地変、戦争、政変、動乱、暴動、ストライキ、法令等の変更、ウイルス被害、その他不可抗力によって本サービスの提供ができなくなった場合</li>
                      <li>登録アカウントの不正利用、システムへのハッキング等について、調査が必要であると当社が判断する場合</li>
                      <li>その他当社の責に帰すべき事由によらずに本サービスの提供を中断または中止することが適切であると当社が判断する場合</li>
                    </ul>
                  </li>
                  <li>前項の場合、当社は、当該ユーザーに生じた損害等につき、一切の責任を負わないものとします。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第12条（損害賠償）</h2>
                <p className="leading-relaxed">
                  ユーザーは、本サービスの利用によって当社に損害を与えた場合は、その一切の損害（弁護士費用を含みます。）を賠償するものとします。ただし、ユーザーに過失が認められない場合はこの限りではありません。
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第13条（免責）</h2>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>当社は、本サービスの利用により生じる一切の損害に対して責任を負わないものとします。</li>
                  <li>当社は本サービスを通して第三者より提供される情報（広告を含む）、第三者が登録し掲載する情報、本サービスに関して第三者が行う行為その他の本サービスに関する一切の事項に関し、その正確性、有用性、適切性、目的適合性、成果、結果等についていかなる表明も保証も行わず、一切の責任を負わないものとします。</li>
                  <li>ユーザーは、自己の責任をもって、ユーザー情報および本サービスを利用する際に用いるIDおよびパスワードを管理するものとし、その紛失、忘却、悪用等について、当社は一切責任を負わないものとします。</li>
                  <li>当社は、当社による本サービスの内容の変更、本サービスの提供の停止、中断、終了、利用不能、本サービスの利用によるデータの消失または機器の故障もしくは損傷その他本サービスに関連してユーザーが被った損害につき、賠償する責任を一切負わないものとします。</li>
                  <li>当社は、ユーザーと求人掲載事業者間の交渉および情報の授受等に関して一切関与せず、ユーザーと求人掲載事業者間で生じた紛争によりユーザーに損害が生じた場合であっても、一切の責任を負わないものとします。</li>
                  <li>当社は、地震、津波、火災、停電、天災地変、戦争、政変、労働紛争等のストライキ、法令または規則等の変更などの不可抗力により、本規約に基づく債務の全部または一部を履行できなかった場合には、それによってユーザーが被った損害につき、賠償する責任を一切負わないものとします。</li>
                  <li>本条の規定にかかわらず、当社が法令等によりユーザーの被った損害を賠償する責任を負う必要のある場合には、当該ユーザーの直接かつ通常の損害に対してのみ責任を負うものとします。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第14条（反社会的勢力の排除）</h2>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>ユーザーは、自らが、現在、暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロまたは特殊知能暴力集団等、その他これらに準ずる者（以下これらを「暴力団員等」といいます。）に該当しないこと、および次の各号のいずれにも該当しないことを表明し、かつ将来にわたっても該当しないことを確約します。
                    <ul className="ml-6 mt-2 list-inside list-disc space-y-2">
                      <li>自らまたは第三者の不正の利益を図る目的または第三者に損害を加える目的をもってする等、不当に暴力団員等を利用していると認められる関係を有すること</li>
                      <li>暴力団員等に対して資金等を提供し、または便宜を供与する等の関与をしていると認められる関係を有すること</li>
                    </ul>
                  </li>
                  <li>ユーザーは、自らまたは第三者を通して次の各号のいずれの行為も行わないことを確約するものとします。
                    <ul className="ml-6 mt-2 list-inside list-disc space-y-2">
                      <li>暴力的な要求、法的な責任範囲を超えた不当な要求行為</li>
                      <li>取引に関して、脅迫的な言動、または暴力を用いる行為</li>
                      <li>風説を流布し、偽計を用いまたは威力を用いて、当社、他のユーザー、その他第三者の信用を毀損し、または、当社、他のユーザー、その他第三者の業務を妨害する行為</li>
                      <li>その他前各号に準ずる行為</li>
                    </ul>
                  </li>
                  <li>当社は、ユーザーが前項のいずれかに該当すると判断した場合、事前の何らの通知を要さず、当該ユーザーのアカウントを削除し、本サービスの利用を停止するものとします。当該ユーザーは、当社による当該処分により生じた損害の一切について、損害賠償請求その他一切の権利を行使できないものとします。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第15条（規約の変更）</h2>
                <p className="leading-relaxed">
                  当社は、本規約を随時変更することができ、変更後の規約（以下「新規約」といいます。）は、本サービス上に事前に告知し、この告知をもって全てのユーザーが確認したものとします。また、本規約に基づいて現に発生している権利義務は新規約による影響を受けないものとします。
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第16条（存続事項）</h2>
                <p className="leading-relaxed">
                  本規約第3条から第8条、第9条第2項、第11条、第12条、第13条、第14条、本条および第17条から第20条までの規定は、ユーザーによる本サービスの利用終了後または当社による本サービスの提供終了後もなお有効に存続するものとします。
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第17条（分離可能性）</h2>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>本規約のいずれかの条項またはその一部が、法令等により無効または執行不能と判断された場合であっても、本規約の残りの規定および一部が無効または執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。</li>
                  <li>前項の場合、当社およびユーザーは、当該無効もしくは執行不能の条項または部分を適法とし、執行力を持たせるために必要な範囲で修正し、当該無効もしくは執行不能な条項また部分の趣旨ならびに法律的および経済的に同等の効果を確保できるように努めるものとします。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第18条（地位等の譲渡）</h2>
                <p className="leading-relaxed">
                  当社は、本サービスにかかる事業を他社に譲渡（会社分割、株式譲渡に伴う事業の実質的譲渡その他の方式を含みます。）した場合には、当該事業譲渡に伴い本規約に基づく地位、権利および義務ならびにユーザーが本サービスの利用に関して当社に提供した情報の一部または全部を当該事業譲渡の譲受人に譲渡することができるものとし、ユーザーは、かかる譲渡につき予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第19条（準拠法・管轄）</h2>
                <ul className="list-inside list-decimal space-y-2 leading-relaxed">
                  <li>本規約は、日本国法に準拠し、解釈されるものとします。</li>
                  <li>本規約または本サービスに関する紛争については、東京地方裁判所または東京簡易裁判所を第一審の専属的合意管轄裁判所とします。</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold">第20条（協議）</h2>
                <p className="leading-relaxed">
                  本規約の規定に関する疑義またはこれらの規定に定めのない事項については、当社とユーザーが誠意をもって協議の上、解決するものとします。
                </p>
              </section>

              <p className="mt-8 text-right text-sm text-muted-foreground">
                【2025年8月14日 制定】
              </p>
            </div>
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden py-10">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg-01.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <Container>
          <div className="rounded-3xl bg-white p-4 shadow-lg sm:p-8">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/menlabjob_lp_header.webp"
                  alt="メンラボジョブ by Mental Health Labo"
                  width={300}
                  height={72}
                  className="h-14 w-auto md:h-16"
                />
              </Link>

              <div className="flex flex-col items-start gap-4">
                <nav className="flex gap-6">
                  <Link
                    href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || "https://logz.co.jp/privacypolicy"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    プライバシーポリシー
                  </Link>
                </nav>

                <p className="text-sm font-semibold text-foreground">
                  ©2025 mental health labo, Inc.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
