import { CatchClickOutside } from './CatchClickOutside';
import './PrimaryBar.less';

import * as React from 'react';

import { classNamePrefixer } from '../css';
import { Icon } from './Icon';

export interface PrimaryBarProps {
    toolbar?: Toolbar;
}

export interface Toolbar {
    title: string;
    items: ToolbarItem[];
}

export interface ToolbarItem {
    title: string;
    href?: string;
    onClick?: () => any;
    isActive?: boolean;
    items?: ToolbarItem[];
}

interface PrimaryBarState {
    expanded: boolean;
    expandedIndex: number | null;
}

const css = classNamePrefixer('primary-bar');

export class PrimaryBar extends React.Component<PrimaryBarProps, PrimaryBarState> {
    constructor(props: PrimaryBarProps) {
        super(props);
        this.state = { expanded: false, expandedIndex: null };
    }

    handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, item: ToolbarItem) => {
        if (typeof item.onClick === 'function') {
            e.preventDefault();
            e.stopPropagation();
            item.onClick();
        }
    };

    toggleCollapseMenu = () => {
        this.setState({
            ...this.state,
            expanded: !this.state.expanded,
            expandedIndex: null,
        });
    };

    toggleCollapseItem = (index: number) => {
        this.setState({
            ...this.state,
            expandedIndex: this.state.expandedIndex === null ? index : null,
        });
    };

    collapseMenu = () => {
        this.setState({
            ...this.state,
            expanded: false,
            expandedIndex: null,
        });
    };

    render() {
        return (
            <div className={css()}>
                <div className={css('left')}>
                </div>
                <div className={css('center')} />
                <div className={css('right')}>
                    <CatchClickOutside onClick={this.collapseMenu}>
                        {this.renderToolbar()}
                    </CatchClickOutside>
                </div>
            </div>
        );
    }

    renderToolbar = () => {
        if (!this.props.toolbar) {
            return;
        }
        return (
            <div className={css('tools')}>
                <div className={css('tools-item')} onClick={this.toggleCollapseMenu}>
                    {this.props.toolbar.title} <Icon type={this.state.expanded ? 'arrow-collapse' : 'arrow-expand'} />
                </div>
                {this.state.expanded && this.renderList(this.props.toolbar.items.map(this.renderItem1))}
            </div>
        );
    };

    renderList = (children: React.ReactNode) => {
        return (
            <ul className={css('tools-list')}>
                {children}
            </ul>
        );
    };

    renderItem1 = (item: ToolbarItem, i: number) => {
        return (
            <li
                key={item.title}
                className={css('tools-item', item.isActive ? 'tools-item-is-active' : '')}
                onClick={e => this.toggleCollapseItem(i)}>
                {this.renderLink(
                    item,
                    item.items && <Icon type={i === this.state.expandedIndex ? 'arrow-previous' : 'arrow-next'} />,
                )}
                {item.items && i === this.state.expandedIndex && this.renderList(item.items.map(this.renderItem2))}
            </li>
        );
    };

    renderItem2 = (item: ToolbarItem) => {
        return (
            <li key={item.title} className={css('tools-item', item.isActive ? 'tools-item-is-active' : '')}>
                {this.renderLink(item)}
            </li>
        );
    };

    renderLink = (item: ToolbarItem, icon?: React.ReactNode) => {
        return (
            <a href={item.href} onClick={e => this.handleItemClick(e, item)}>
                {item.title} {icon}
            </a>
        );
    };
}
/*
<div class="primary-bar-tools" *ngIf="toolbar" (onClickOutside)="closeTools()" [onClickOutsideIf]="tools">
    <div class="primary-bar-tools-item" (click)="toggleTools()">{{toolbar.title}} <i class="v-icon" [ngClass]="tools ? 'v-icon-arrow-collapse' : 'v-icon-arrow-expand'"></i></div>
    <ul class="primary-bar-tools-list" *ngIf="tools">
        <li class="primary-bar-tools-item" *ngFor="let x of toolbar.items; let i=index" (click)="toggleIndex(i)" [ngClass]="{'is-active': x.isActive}">
            <a href="javascript:void(0)" [attr.href]="x.href ? x.href : null" (click)="onClick($event, x)">{{x.title}}
                <i class="v-icon" *ngIf="x.items" [ngClass]="i === index ? 'v-icon-arrow-previous' : 'v-icon-arrow-next'"></i>
            </a>

            <ul class="primary-bar-tools-list" *ngIf="x.items && i === index">
                <li *ngFor="let y of x.items" class="primary-bar-tools-item" [ngClass]="{'is-active': y.isActive}">
                    <a href="javascript:void(0)" [attr.href]="x.href ? x.href : null" (click)="onClick($event, y)">{{y.title}}</a>
                </li>
            </ul>
        </li>
    </ul>
</div>
 */
