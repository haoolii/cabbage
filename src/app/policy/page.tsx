import { getConfig } from "@/core/config";

export default function Policy() {
  return (
    <div className="max-w-3xl mx-auto py-10 privacy-policy">
      <div>
        <h1 className="text-4xl font-bold py-4 text-center">免責聲明</h1>
        <ul className="space-y-6 leading-relaxed list-disc pl-5 text-pretty">
          <li className="list-none">
            <h3 className="text-lg font-semibold">1. 資料準確性與完整性</h3>
            <p>
              本網站的所有資料，包括文字、圖片、影片、聲音、連結及其他資料等，僅供參考之用。雖然我們會盡力確保資料的準確性，但不保證所有資料絕對準確無誤。對於任何錯誤或遺漏引起的損失，我們不承擔法律責任。
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">2. 技術運作與安全</h3>
            <p>
              我們會盡力確保網站技術上運作正常，但無法保證網站完全免於電腦病毒、系統故障、資料損失等問題。如果使用者因使用本網站而遭受任何損害（包括但不限於上述問題），我們不會承擔任何法律責任或賠償。
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">3. 用戶上傳內容責任</h3>
            <p>
              用戶上傳的圖片、影片或其他內容，以及透過本網站生成的縮網址所指向的外部連結，皆由用戶自行負責。本網站不對這些內容的合法性、準確性或安全性承擔責任。用戶應確保其上傳的內容不侵犯他人權益，並遵守相關法律法規。
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">4. 縮網址服務風險</h3>
            <p>
              本網站提供的縮網址服務可能會遇到安全風險，如惡意軟件或釣魚網站。使用者點擊短網址前應自行評估風險。另外，如果縮網址服務商的網域被收回或停止服務，所有使用該服務的短網址可能會失效，造成行銷宣傳連結失效。
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">5. 隱私問題</h3>
            <p>
              部分縮網址服務可能會收集使用者的點擊數據，對個人隱私造成威脅。使用者應注意這一點，並自行決定是否使用相關服務。
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">6. 版權與知識產權</h3>
            <p>
            本網站所有內容，包括文字、圖片、影片等，均受相關知識產權法保護。未經授權，不得轉載、重製或以其他方式使用本網站內容。如有侵權行為，我們保留追究法律責任的權利。
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">7. 管轄法律</h3>
            <p>
              本免責聲明受[中華民國]法律約束，並按照[中華民國]法律進行詮釋。使用者同意接受[中華民國]法院的非專有審判權管轄。
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">8. 免責聲明更新</h3>
            <p>
              我們保留隨時更新本免責聲明的權利，任何更改於本網站發佈時立即生效。使用者應在每次瀏覽網站時查看最新的免責聲明。如繼續使用本網站，即代表使用者同意接受更改後的免責聲明約束。
            </p>
          </li>
        </ul>
      </div>
      
      <div className="py-10"></div>

      <div>
        <h1 className="text-4xl font-bold py-4 text-center">Disclaimer</h1>
        <ul className="space-y-6 leading-relaxed list-disc pl-5 text-pretty">
          <li className="list-none">
            <h3 className="text-lg font-semibold">1. Accuracy and Completeness of Information</h3>
            <p>
              All information on this website, including text, images, videos, audio, links, and other data, is provided for reference purposes only. Although we strive to ensure the accuracy of the information, we do not guarantee that all data is entirely accurate or up-to-date. We disclaim any liability for losses arising from any errors or omissions.
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">2. Technical Operation and Security</h3>
            <p>
              We will make every effort to ensure that the website operates technically without issues, but we cannot guarantee that the website is completely free from computer viruses, system failures, data loss, or other problems. If users suffer any damage (including but not limited to the aforementioned issues) while using this website, we will not assume any legal liability or compensation.
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">3. User-Uploaded Content Responsibility</h3>
            <p>
              Users are solely responsible for any images, videos, or other content they upload, as well as external links pointed to by shortened URLs generated through this website. This website does not assume responsibility for the legality, accuracy, or safety of such content. Users must ensure that their uploaded content does not infringe on others' rights and complies with relevant laws and regulations.
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">4. Shortened URL Service Risks</h3>
            <p>
              The shortened URL service provided by this website may encounter security risks, such as malware or phishing sites. Users should evaluate the risks before clicking on shortened URLs. Additionally, if the domain of the shortened URL service provider is reclaimed or the service is discontinued, all shortened URLs using that service may become invalid, causing marketing links to fail.
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">5. Privacy Issues</h3>
            <p>
              Some shortened URL services may collect users' click data, posing a threat to personal privacy. Users should be aware of this and decide whether to use such services accordingly.
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">6. Copyright and Intellectual Property</h3>
            <p>
              All content on this website, including text, images, videos, etc., is protected by relevant intellectual property laws. Without authorization, users are not permitted to reproduce, distribute, or use this content in any way.
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">7. Governing Law</h3>
            <p>
              This disclaimer is governed by and construed in accordance with the laws of [Republic of China]. Users agree to submit to the non-exclusive jurisdiction of the courts of [Republic of China].
            </p>
          </li>

          <li className="list-none">
            <h3 className="text-lg font-semibold">8. Disclaimer Updates</h3>
            <p>
              We reserve the right to update this disclaimer at any time, and any changes will take effect immediately upon publication on this website. Users should review the latest disclaimer each time they visit the website. Continued use of this website implies acceptance of the updated disclaimer.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
