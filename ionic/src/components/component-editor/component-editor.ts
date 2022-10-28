import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Content, Events, ViewController } from 'ionic-angular';
import { Config } from '../../config';
import { OutputBlockModel } from '../../models/output-block.model';
import { ElectronProvider } from '../../providers/electron/electron';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'component-editor',
  templateUrl: 'component-editor.html'
})
export class ComponentEditorComponent implements OnInit {
  @ViewChild(Content) content: Content;
  @Input() outputBlock: OutputBlockModel;
  @Input() locked = false;
  public color: string;

  constructor(
    public viewCtrl: ViewController,
    public electronProvider: ElectronProvider,
    private events: Events,
  ) {
    this.events.subscribe('google:logout', () => {
      this.content.scrollToTop();
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe('google:logout');
  }

  ngOnInit(): void {
    this.color = UtilsProvider.GetComponentColor(this.outputBlock);
  }

  public onCloseClick() {
    this.viewCtrl.dismiss();
  }

  public onHelpClick() {
    switch (this.outputBlock.type) {
      case 'barcode': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'key': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'text': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'variable': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'function': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_JAVASCRIPT_FUNCTION); break;
      case 'barcode': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'delay': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'if': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_IF); break;
      case 'endif': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_IF); break;
      case 'http': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_HTTP); break;
      case 'run': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_RUN); break;
      case 'select_option': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'beep': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'csv_lookup': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CSV_LOOKUP); break;
      case 'csv_update': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CSV_UPDATE); break;
      case 'alert': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
      case 'woocommerce': this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_WOOCOMMERCE); break;
      default: this.electronProvider.shell.openExternal(Config.URL_TUTORIAL_CREATE_OUTPUT_TEMPLATE); break;
    }
  }

  getJavascriptFunctionVariablesInjectionTutorialUrl() {
    return Config.URL_TUTORIAL_JAVASCRIPT_FUNCTION;
  }
}
