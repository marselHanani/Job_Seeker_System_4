import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  DestroyRef,
  assertInInjectionContext,
  inject,
  require_operators
} from "./chunk-KQDJUYDU.js";
import {
  require_cjs
} from "./chunk-2K3BKASH.js";
import {
  __toESM
} from "./chunk-ANGF2IQY.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new import_rxjs.Observable((observer) => {
    const unregisterFn = destroyRef.onDestroy(observer.next.bind(observer));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe((0, import_operators.takeUntil)(destroyed$));
  };
}

export {
  takeUntilDestroyed
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v19.2.3
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-GRC4UZOD.js.map
