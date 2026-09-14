import customNumpadCover from "@/assets/images/projects/custom-numpad-cover.webp";
import flcCalculatorAppIcon from "@/assets/images/projects/flc-calculator/flc-calculator-app-icon.webp";
import flcCalculatorShowcasePhones from "@/assets/images/projects/flc-calculator/flc-calculator-showcase-phones.webp";
import kursvalutShowcaseCenter from "@/assets/images/projects/kursvalut/kursvalut-showcase-center.webp";
import kursvalutShowcaseLeft from "@/assets/images/projects/kursvalut/kursvalut-showcase-left.webp";
import kursvalutShowcaseRight from "@/assets/images/projects/kursvalut/kursvalut-showcase-right.webp";
import liveTvCover from "@/assets/images/projects/web/web-demo-livetv-front.webp";
import nftCover from "@/assets/images/projects/web/web-demo-nft-front.webp";
import pagesCover from "@/assets/images/projects/web/web-demo-pages-front.webp";
import rikshaCover from "@/assets/images/projects/web/web-demo-riksha-front.webp";

import type { Project } from "@/types/project";

export const projects: Project[] = [
    {
        "id": "kursvalut",
        "title": "Kursvalut",
        "category": "swift",
        "description": "projectDescription1",
        "technologies": [
            "UIKit",
            "iOS"
        ],
        "rating": {
            "score": "4.9",
            "count": 140
        },
        "visual": {
            "type": "showcase",
            "variant": "trio",
            "badge": kursvalutShowcaseCenter,
            "left": kursvalutShowcaseLeft,
            "right": kursvalutShowcaseRight
        },
        "links": [
            { "kind": "appStore", "label": "appStore", "url": "https://apps.apple.com/ru/app/kursvalut-%D0%BA%D0%BE%D0%BD%D0%B2%D0%B5%D1%80%D1%82%D0%B5%D1%80-%D0%B2%D0%B0%D0%BB%D1%8E%D1%82/id1614298661" },
            { "kind": "website", "label": "openWeb", "url": "/portfolio/kursvalut/kursvalut.html" },
            { "kind": "github", "label": "GitHub", "url": "https://github.com/artexhibit/Kursvalut" }
        ]
    },
    {
        "id": "flc-calculator",
        "title": "FLC Calculator",
        "titleKey": "projectTitleFlc",
        "category": "swift",
        "description": "projectDescriptionFlc",
        "technologies": [
            "UIKit",
            "Programmatic UI",
            "Firebase",
            "Core Data",
            "CloudKit"
        ],
        "rating": {
            "score": "4.9",
            "count": 670
        },
        "visual": {
            "type": "showcase",
            "variant": "split",
            "badge": flcCalculatorAppIcon,
            "right": flcCalculatorShowcasePhones
        },
        "links": [
            { "kind": "appStore", "label": "appStore", "url": "https://apps.apple.com/ru/app/flc-calculator-%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82-%D0%B2-%D1%80%D1%84/id6547868937" },
            { "kind": "github", "label": "GitHub", "url": "https://github.com/votnakodil/FLCCalculator" },
            { "kind": "article", "label": "articleVc", "url": "https://vc.ru/free_lines/1377101-mobilnoe-prilozhenie-flc-calculator" }
        ]
    },
    {
        "id": "custom-numpad",
        "title": "CustomNumpad",
        "category": "swift",
        "description": "projectDescription6",
        "technologies": [
            "UIKit",
            "Storyboard",
            "XIB",
            "UIBezierPath",
            "CAShapeLayer"
        ],
        "visual": { "type": "cover", "source": customNumpadCover },
        "links": [
            { "kind": "github", "label": "GitHub", "url": "https://github.com/artexhibit/CustomNumpad" }
        ]
    },
    {
        "id": "nft",
        "title": "NFT",
        "category": "web",
        "description": "projectDescription2",
        "technologies": [
            "HTML",
            "CSS"
        ],
        "visual": { "type": "cover", "source": nftCover },
        "links": [
            { "kind": "website", "label": "link__title2", "url": "/portfolio/NFT-landing/index.html" },
            { "kind": "github", "label": "GitHub", "url": "https://github.com/artexhibit/Fundamentals-of-algorithmization-and-programming/tree/main/HTML/Вёрстка%20HTML/Вёрстка%20NFT%20проекта%20(ПР%20№5%2027%3A12)" }
        ]
    },
    {
        "id": "livetv",
        "title": "LiveTV",
        "category": "web",
        "description": "projectDescription3",
        "technologies": [
            "Bootstrap"
        ],
        "visual": { "type": "cover", "source": liveTvCover },
        "links": [
            { "kind": "website", "label": "link__title2", "url": "/portfolio/liveTV-cinema/index.html" },
            { "kind": "github", "label": "GitHub", "url": "https://github.com/artexhibit/Fundamentals-of-algorithmization-and-programming/tree/main/HTML/Вёрстка%20Bootstrap/Онлайн%20кинотеатр%20LiveTV" }
        ]
    },
    {
        "id": "riksha",
        "title": "Riksha",
        "category": "web",
        "description": "projectDescription4",
        "technologies": [
            "SASS/SCSS"
        ],
        "visual": { "type": "cover", "source": rikshaCover },
        "links": [
            { "kind": "website", "label": "link__title2", "url": "/portfolio/riksha-sushi/index.html" },
            { "kind": "github", "label": "GitHub", "url": "https://github.com/artexhibit/Fundamentals-of-algorithmization-and-programming/tree/main/HTML/Вёрстка%20SASS%2CSCSS/Магазин%20суши%20Riksha" }
        ]
    },
    {
        "id": "pages",
        "title": "Pages",
        "category": "web",
        "description": "projectDescription5",
        "technologies": [
            "Tailwind"
        ],
        "visual": { "type": "cover", "source": pagesCover },
        "links": [
            { "kind": "website", "label": "link__title2", "url": "/portfolio/pages-bookstore/index.html" },
            { "kind": "github", "label": "GitHub", "url": "https://github.com/artexhibit/Fundamentals-of-algorithmization-and-programming/tree/main/HTML/Вёрстка%20Tailwind/Книжный%20магазин%20Pages" }
        ]
    }
];
