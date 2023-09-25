import { Component, OnInit } from '@angular/core';
import { MatIconName } from 'src/app/commons/constant/material-icon';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  matIcons = MatIconName;
  // danh sách item sidebar 
  listMenu = [
    {
      ID: 1,
      Name: "Home",
      Icon: MatIconName.Home,
      IsActive: true,
      Background: "#2f53ff",
      Link: "overview"
    },
    {
      ID: 2,
      Name: "Product",
      Icon: MatIconName.Product,
      IsActive: false,
      Background: "#00000082",
      Link: "products"
    },
    {
      ID: 3,
      Name: "ProductBrand",
      Icon: MatIconName.ProductBrand,
      IsActive: false,
      Background: "#2ce283",
      Link: "brands"
    },
    {
      ID: 5,
      Name: "Setting",
      Icon: MatIconName.Setting,
      IsActive: false,
      Background: "#b0b0b0",
      Link: "setting"
    },
  ];

  // Biến quản lý trạng thái của sidebar
  sidebarSate = {
    IsShow: true
  }


  constructor() {
  }



  ngOnInit(): void {
  }


  /**
   * Xử lý điều hướng khi click vào menu
   * CreatedBy: PDXuan(2021/09/03)
   */
  onClickMenu(item: any) {
    this.listMenu.forEach(menu => menu.IsActive = false);
    item.IsActive = true;

  }


  /**
   * Xử lý ẩn hiện sidebar
   * CreatedBy: PDXuan(2021/09/03)
   */
  toggleSidebar() {
    this.sidebarSate.IsShow = !this.sidebarSate.IsShow;
  }

}
