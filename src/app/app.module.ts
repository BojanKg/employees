import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import firebase from 'firebase/app';
//import {AngularFireModule} from '@angular/fire';
//import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
//import { AngularFireAuth } from '@angular/fire/auth';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { HeaderComponent } from './header/header.component';
import { PayoffComponent } from './payoff/payoff.component';
import { AuthComponent } from './auth/auth.component';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LogSpinComponent } from './auth/log-spin/log-spin.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { CkeckComponent } from './ckeck/ckeck.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddComponent,
    DetailsComponent,
    WorkingDaysComponent,
    HeaderComponent,
    PayoffComponent,
    AuthComponent,
    LogSpinComponent,
    PopUpComponent,
    CkeckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    ButtonModule,
    TagModule,
    CardModule,
    TreeModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    VirtualScrollerModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DockModule,
    DragDropModule,
    DropdownModule,
    DynamicDialogModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ImageModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SidebarModule,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SpeedDialModule,
    SpinnerModule,
    SplitterModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TriStateCheckboxModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    AccordionModule,
    AvatarModule,
    AnimateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
