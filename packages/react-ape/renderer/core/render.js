/**
 * Copyright (c) 2019-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import type {CanvasComponentContext, Layout, ApeElement} from '../types';

function renderApeElement(
  apeContextGlobal: CanvasComponentContext,
  element: ApeElement
) {
  element.render(apeContextGlobal, element.parentLayout);
}

function renderApeQueue(
  apeContextGlobal: CanvasComponentContext,
  onFinish: () => mixed
) {
  if (apeContextGlobal && apeContextGlobal.renderQueue.length) {
    const queue = apeContextGlobal.renderQueue;

    let reqId;
    const frame = () => {
      if (queue.length) {
        const element = queue.shift();
        element.render(apeContextGlobal, element.parentLayout);

        reqId = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(reqId);
        onFinish();
      }
    };
    frame();
  }
}

export const renderQueue = renderApeQueue;
export const renderElement = renderApeElement;
