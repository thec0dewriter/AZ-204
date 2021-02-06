import { Component, OnInit, ɵɵtrustConstantResourceUrl } from "@angular/core";
import * as SignalR from "@aspnet/signalr";
import { environment } from "src/environments/environment";
import { FoodFacade } from "../store/facades/food.service";

@Component({
  selector: "app-food-container",
  templateUrl: "./food-container.component.html",
  styleUrls: ["./food-container.component.scss"],
})
export class FoodContainerComponent implements OnInit {
  food$ = this.ff.getFood();
  selected$ = this.ff.getSelected();

  // events: string[] = [];
  hubConnection: SignalR.HubConnection;

  constructor(public ff: FoodFacade) {
    // Create connection
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(`${environment.signalrurl}/api`)
      .build();

    // Start connection. This will call negotiate endpoint
    this.hubConnection.start();

    // Handle incoming events for the specific target
    this.hubConnection.on("newEvent", (event) => {
      console.log("SignalR - initFood", event);
      this.ff.initFood();
    });
  }

  ngOnInit() {
    this.ff.initFood();
  }
}
