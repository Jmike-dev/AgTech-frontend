import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
    selector: 'app-root',
    imports: [NgxSonnerToaster, RouterOutlet],
    template: `<ngx-sonner-toaster position="top-center" richColors />
        <router-outlet /> `,
})
export class AppComponent {
    title = 'AgTech';
}
