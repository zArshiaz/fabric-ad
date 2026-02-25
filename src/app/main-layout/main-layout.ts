import {Component, signal, WritableSignal} from '@angular/core';
import {Header} from "../components/header/header";
import {RouterOutlet} from "@angular/router";
import {Sidebar} from "../components/sidebar/sidebar";
import {provideIcons} from '@ng-icons/core';
import {
  bootstrapCalendar2Date,
  bootstrapChatLeft,
  bootstrapChevronDown, bootstrapEye, bootstrapEyeSlash, bootstrapLayoutWtf, bootstrapPaperclip, bootstrapPlusCircle,
  bootstrapPlusLg, bootstrapRulers,
  bootstrapSquare, bootstrapStar, bootstrapStarFill, bootstrapStarHalf, bootstrapTag
} from '@ng-icons/bootstrap-icons';
import {
  ionAlertCircleOutline,
  ionArrowRedoOutline,
  ionBriefcaseSharp,
  ionCheckmarkOutline,
  ionClose,
  ionColorPalette, ionCut,
  ionHeartOutline, ionLogOutOutline, ionMenuSharp, ionReload, ionWarningOutline
} from '@ng-icons/ionicons';
import {
  heroChevronLeft,
  heroChevronRight,
  heroRectangleStack, heroShoppingCart,
  heroTrash,
  heroUserCircle, heroUserGroup, heroUsers
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-main-layout',
    imports: [
        Header,
        RouterOutlet,
        Sidebar
    ],
  viewProviders: [provideIcons({bootstrapChevronDown,bootstrapSquare,bootstrapChatLeft,ionClose,bootstrapPlusLg,ionArrowRedoOutline,ionHeartOutline,bootstrapCalendar2Date,ionCheckmarkOutline,bootstrapRulers,ionColorPalette,ionBriefcaseSharp,bootstrapTag,bootstrapStar,bootstrapStarHalf,bootstrapStarFill,heroChevronRight,heroChevronLeft,heroRectangleStack,ionAlertCircleOutline,ionWarningOutline,ionReload,heroTrash,bootstrapPlusCircle,heroUserCircle,ionLogOutOutline,bootstrapEyeSlash,bootstrapEye,heroUsers,bootstrapPaperclip,ionCut, heroUserGroup, bootstrapLayoutWtf, heroShoppingCart, ionMenuSharp})],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  showSidebar: WritableSignal<boolean> = signal(true);

  changeShowSidebar() {
    this.showSidebar.update(pre => !pre);
  }
}
