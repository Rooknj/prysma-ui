import React from "react";
import { sortableContainer, sortableElement, sortableHandle } from "react-sortable-hoc";

export const DragHandle = sortableHandle(({ children }) => <span>{children}</span>);

export const ReorderableItem = sortableElement(({ children }) => <div>{children}</div>);

export const ReorderableContainer = sortableContainer(({ children }) => <div>{children}</div>);
