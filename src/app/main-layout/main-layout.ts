import {Component, signal, WritableSignal} from '@angular/core';
import {Header} from "../components/header/header";
import {RouterOutlet} from "@angular/router";
import {Sidebar} from "../components/sidebar/sidebar";

@Component({
  selector: 'app-main-layout',
    imports: [
        Header,
        RouterOutlet,
        Sidebar
    ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  showSidebar: WritableSignal<boolean> = signal(true);

  changeShowSidebar() {
    this.showSidebar.update(pre => !pre);
  }
}
