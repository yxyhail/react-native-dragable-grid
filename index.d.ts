// Type definitions for react-native-dragable-grid 0.0.1
// Project: https://github.com/yxyhail/react-native-dragable-grid
// Definitions by: Jacob Froman <https://github.com/j-fro>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 0.0.1

import * as React from 'react';
import { StyleProp, ViewStyle, Animated } from 'react-native';

export type DragAnimation = 'scale' | 'wiggle'

interface DragableGridItemProps {
    key: string;

    /**
     * Function that is executed when the block is tapped once, but not pressed
     *  for long enough to activate the drag.
     */
    onTap?(): void;

    /**
     * Function that is executed when the block is double tapped within a
     * timeframe of doubleTapTreshold (default 150ms). Assigning this will
     * delay the execution of onTap. Omitting this will cause all taps to be
     * handled as single taps, regardless of their frequency.
     */
    onDoubleTap?(): void;

    /**
     * Flag to mark a child node as being inactive. If set, no touch events
     * will be fired when users interact with the node.
     */
    inactive?: boolean;
}

type DragableGridItem = React.ReactElement<DragableGridItemProps>;

interface OrderedItem {
    key: string;
    ref: DragableGridItem | null;
    order: number;
}

export interface ItemOrder {
    itemOrder: ReadonlyArray<OrderedItem>;
}

interface DragableGridProps {
    /**
     * Custom styles to override or complement the DragableGrid native style.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * How long should the transition of a passive block take when the active
     * block takes its place (milliseconds)
     */
    blockTransitionDuration?: number;

    /**
     * How long should it take for the block that is being dragged to seek its
     * place after it's released (milliseconds)
     */
    activeBlockCenteringDuration?: number;

    /**
     * How many items should be placed on one row
     */
    itemsPerRow?: number;

    /**
     * If set, itemsPerRow will be calculated to fit items of this size
     */
    itemWidth?: number;

    /**
     * When used together with itemsPerRow, sets the size of a block to
     * something other than the default square
     */
    itemHeight?: number;

    /**
     * How long must the user hold the press on the block until it becomes
     * active and can be dragged (milliseconds)
     */
    dragActivationThreshold?: number;

    /**
     * How long will the execution wait for the second tap before deciding it
     * was a single tap (milliseconds). Will be omitted if no
     * onDoubleTap-property is given to the item being tapped - In which case
     * single-tap callback will be executed instantly
     */
    doubleTapTreshold?: number;

    /**
     * Whether there is a moving boundary. The defult value is false, which you can 
     * drag the items everywhere on the screen, if set to true, you can only drag the 
     * items in the drageable grid view
     */
    hasChoke?: boolean;

    defaultAnimation?: DragAnimation;

    /**
     * Function that is called when the dragging starts. This can be used to
     * lock other touch responders from listening to the touch such as
     * ScrollViews and Swipers.
     */
    onDragStart?(item: OrderedItem): void;

    /**
     * Function that is called when started dragging but no movement, then released finger.
     */
    onDragCancel?(item: OrderedItem): void

    /**
     * Function that is executed after the drag is released. Will return the
     * new item order.
     */
    onDragRelease?(itemOrder: ItemOrder): void;

    /**
     * Function that is executed item is deleted. Will return the properties
     * of the deleted item.
     */
    onDeleteItem?(deletedItem: OrderedItem): void;

    /**
     * Custom animation to override the default wiggle. Must be an object
     * containing a key transform, which is an array of transformations.
     */
    dragStartAnimation?: {
        transform: ReadonlyArray<{ [type: string]: Animated.AnimatedInterpolation }>;
    };

    /**
     * Items to be rendered in the DragableGrid
     */
    children?: ReadonlyArray<DragableGridItem>;
}

interface DragableGridStatic extends React.ClassicComponentClass<DragableGridProps> {
    /**
     * Calling this will toggle item deletion mode on/off.
     */
    toggleDeleteMode(): { deleteModeOn: boolean };
}

declare var DragableGrid: DragableGridStatic;
type DragableGrid = DragableGridStatic;

export default DragableGrid;
