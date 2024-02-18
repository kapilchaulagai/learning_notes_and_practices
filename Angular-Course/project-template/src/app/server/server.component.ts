import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})
export class ServerComponent {
  serverId = 101;
  private serverName = 'no-offline';

  getServerName() {
    return this.serverName;
  }
}
