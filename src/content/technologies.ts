import type { TranslationKey } from "@/features/language/translations";
import cssIcon from "@/assets/icons/technologies/technology-css.svg";
import figmaIcon from "@/assets/icons/technologies/technology-figma.svg";
import firebaseIcon from "@/assets/icons/technologies/technology-firebase.svg";
import gitIcon from "@/assets/icons/technologies/technology-git.svg";
import htmlIcon from "@/assets/icons/technologies/technology-html5.svg";
import firstFormIcon from "@/assets/icons/technologies/technology-first-form.svg";
import javascriptIcon from "@/assets/icons/technologies/technology-javascript.svg";
import jsonIcon from "@/assets/icons/technologies/technology-json.svg";
import n8nIcon from "@/assets/icons/technologies/technology-n8n.svg";
import oneCIcon from "@/assets/icons/technologies/technology-1c.svg";
import reactIcon from "@/assets/icons/technologies/technology-react.svg";
import sassIcon from "@/assets/icons/technologies/technology-sass.svg";
import sqliteIcon from "@/assets/icons/technologies/technology-sqlite.svg";
import swiftIcon from "@/assets/icons/technologies/technology-swift.svg";
import uiKitIcon from "@/assets/icons/technologies/technology-uikit.svg";
import visualStudioCodeIcon from "@/assets/icons/technologies/technology-visual-studio-code.svg";
import xcodeIcon from "@/assets/icons/technologies/technology-xcode.svg";

export type Technology = { name: string; icon: string };
export type TechnologyGroup = { title: TranslationKey; technologies: Technology[] };

export const technologyGroups: TechnologyGroup[] = [
    { title: "developmentGroup", technologies: [
        { name: "JavaScript", icon: javascriptIcon }, { name: "HTML", icon: htmlIcon },
        { name: "CSS", icon: cssIcon }, { name: "React", icon: reactIcon },
        { name: "Git", icon: gitIcon }, { name: "JSON", icon: jsonIcon },
        { name: "Firebase", icon: firebaseIcon }, { name: "Sass", icon: sassIcon },
    ] },
    { title: "appleGroup", technologies: [
        { name: "Swift", icon: swiftIcon }, { name: "SwiftUI", icon: swiftIcon },
        { name: "UIKit", icon: uiKitIcon }, { name: "Xcode", icon: xcodeIcon },
    ] },
    { title: "workflowGroup", technologies: [
        { name: "Visual Studio Code", icon: visualStudioCodeIcon }, { name: "Figma", icon: figmaIcon },
        { name: "SQLite", icon: sqliteIcon }, { name: "First Form", icon: firstFormIcon },
        { name: "n8n", icon: n8nIcon }, { name: "1C", icon: oneCIcon },
    ] },
];
