// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {AbstractComponent} from './dnd.component';
import {DragDropConfig} from './dnd.config';
import {DragDropService} from './dnd.service';

@Directive({ selector: '[dnd-droppable]' })
export class DroppableComponent extends AbstractComponent {

    @Input("dropEnabled") set droppable(value:boolean) {
        this.dropEnabled = !!value;
    }
    
    /**
     * Callback function called when the drop action completes correctly.
     * It is activated before the on-drag-success callback.
     */
    @Output("onDropSuccess") onDropSuccessCallback: EventEmitter<any> = new EventEmitter<any>();
    
    @Input("dropZones") set dropzones(value:Array<string>) {
        this.dropZones = value;
    }

    constructor(elemRef: ElementRef, _dragDropService: DragDropService, _config:DragDropConfig) {
        super(elemRef, _dragDropService, _config);
        
        this.dropEnabled = true;
    }

    _onDragEnterCallback(event: Event) {
        this._elem.classList.add(this._config.onDragEnterClass);
    }
    
    _onDragOverCallback (event: Event) {
        this._elem.classList.add(this._config.onDragOverClass);
    };

    _onDragLeaveCallback (event: Event) {
        this._elem.classList.remove(this._config.onDragOverClass);
        this._elem.classList.remove(this._config.onDragEnterClass);
    };

    _onDropCallback (event: Event) {
        if (this.onDropSuccessCallback) {
            // console.log('onDropCallback.onDropSuccessCallback.dragData', this._dragDropService.dragData);
            this.onDropSuccessCallback.emit(this._dragDropService.dragData);
        }
        if (this._dragDropService.onDragSuccessCallback) {
            // console.log('onDropCallback.onDragSuccessCallback.dragData', this._dragDropService.dragData);
            this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
        }
        this._elem.classList.remove(this._config.onDragOverClass);
        this._elem.classList.remove(this._config.onDragEnterClass);
    }
}
