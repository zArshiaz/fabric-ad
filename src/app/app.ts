import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from './components/sidebar/sidebar';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {
  heroTrash,
  heroUsers,
  heroUserGroup,
  heroShoppingCart,
  heroUserCircle,
  heroRectangleStack,
  heroChevronLeft, heroChevronRight
} from '@ng-icons/heroicons/outline';
import {
  bootstrapLayoutWtf,
  bootstrapPaperclip,
  bootstrapEye,
  bootstrapEyeSlash,
  bootstrapPlusCircle,
  bootstrapStarFill,
  bootstrapStarHalf,
  bootstrapStar,
  bootstrapTag,
  bootstrapRulers,
  bootstrapCalendar2Date, bootstrapPlusLg, bootstrapChatLeft, bootstrapSquare, bootstrapChevronDown,
} from '@ng-icons/bootstrap-icons';
import {
  ionMenuSharp,
  ionCut,
  ionLogOutOutline,
  ionReload,
  ionWarningOutline,
  ionAlertCircleOutline,
  ionBriefcaseSharp,
  ionColorPalette,
  ionCheckmarkOutline,
  ionHeartOutline,
  ionArrowRedoOutline,
  ionClose
} from '@ng-icons/ionicons'
import {AuthService} from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  viewProviders: [provideIcons({bootstrapChevronDown,bootstrapSquare,bootstrapChatLeft,ionClose,bootstrapPlusLg,ionArrowRedoOutline,ionHeartOutline,bootstrapCalendar2Date,ionCheckmarkOutline,bootstrapRulers,ionColorPalette,ionBriefcaseSharp,bootstrapTag,bootstrapStar,bootstrapStarHalf,bootstrapStarFill,heroChevronRight,heroChevronLeft,heroRectangleStack,ionAlertCircleOutline,ionWarningOutline,ionReload,heroTrash,bootstrapPlusCircle,heroUserCircle,ionLogOutOutline,bootstrapEyeSlash,bootstrapEye,heroUsers,bootstrapPaperclip,ionCut, heroUserGroup, bootstrapLayoutWtf, heroShoppingCart, ionMenuSharp})],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {

  constructor(private AuthService:AuthService) {

  }

  ngOnInit(): void {

  }




}

