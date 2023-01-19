import { VNode } from 'vue';

export declare interface globalPropertiesType {
    $baseLoading(index?: string | undefined, text?: string): any;
    $baseMessage(message: string | VNode, type?: 'success' | 'warning' | 'info' | 'error', customClass?: string, dangerouslyUseHTMLString?: boolean): any;
    $baseAlert(content: string | VNode, title?: string, callback?: (() => unknown) | undefined): any;
    $basePrompt(content: string | VNode, title: string, callback1: any, callback2: any, options: object): any;
    $baseConfirm(content: string | VNode, title: string, callback1: any, callback2: any, confirmButtonText?: string, cancelButtonText?: string): any;
    $baseNotify(message: string, title: string, type?: 'success' | 'warning' | 'info' | 'error', position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left', callback?: any, duration?: number): any;
    $baseTableHeight(formType: number | unknown): number;
}
