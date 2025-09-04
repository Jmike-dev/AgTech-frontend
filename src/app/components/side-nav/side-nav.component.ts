import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type IconSet =
    | 'material-icons'
    | 'material-icons-outlined'
    | 'material-icons-round'
    | 'material-icons-sharp'
    | 'material-icons-two-tone'
    | 'material-symbols-outlined';

export interface Sidebar {
    name: string;
    route: string;
    icon: string;
    iconSet?: IconSet;
}

@Component({
    selector: 'side-nav',
    imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
    template: `<ul class="mt-8 space-y-8">
        @for (item of sideBar(); track $index) {
            <li class="flex items-center space-x-2">
                <a
                    routerLink="/dashboard{{ item.route }}"
                    class="hover:bg-brand-background-light hover:text-brand-accent-light hover:ring-brand-accent-light flex w-full items-center space-x-1 rounded p-2 text-base font-medium transition duration-500 ease-in-out hover:ring-2"
                    routerLinkActive="bg-brand-accent-light text-brand-background-light "
                >
                    <mat-icon
                        aria-hidden="false"
                        fontIcon="{{ item.icon }}"
                        class="{{ item.iconSet }}"
                        fontSet="{{ item.iconSet }}"
                        >{{ item.icon }}</mat-icon
                    >
                    <span>{{ item.name }}</span>
                </a>
            </li>
        }
    </ul>`,
})
export class SideNavComponent {
    readonly sideBar = input.required<Sidebar[]>();
}
