import {
  Service,
  isSignal,
  setClassMetadata,
  ɵɵdefineService
} from "./chunk-75XUJ6ME.js";

// node_modules/@angular/material/fesm2022/_error-options-chunk.mjs
var ShowOnDirtyErrorStateMatcher = class _ShowOnDirtyErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.dirty || form && form.submitted));
  }
  isSignalErrorState(field) {
    if (!field) {
      return false;
    }
    const invalid = field().invalid();
    const dirty = field().dirty();
    return invalid && dirty;
  }
  static ɵfac = function ShowOnDirtyErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShowOnDirtyErrorStateMatcher)();
  };
  static ɵprov = ɵɵdefineService({
    token: _ShowOnDirtyErrorStateMatcher,
    factory: _ShowOnDirtyErrorStateMatcher.ɵfac,
    autoProvided: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShowOnDirtyErrorStateMatcher, [{
    type: Service,
    args: [{
      autoProvided: false
    }]
  }], null, null);
})();
var ErrorStateMatcher = class _ErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.touched || form && form.submitted));
  }
  isSignalErrorState(field) {
    if (!field) {
      return false;
    }
    const invalid = field().invalid();
    const touched = field().touched();
    return invalid && touched;
  }
  static ɵfac = function ErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorStateMatcher)();
  };
  static ɵprov = ɵɵdefineService({
    token: _ErrorStateMatcher,
    factory: _ErrorStateMatcher.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorStateMatcher, [{
    type: Service
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_error-state-chunk.mjs
var _ErrorStateTracker = class {
  _defaultMatcher;
  _parentFormGroup;
  _parentForm;
  _stateChanges;
  errorState = false;
  matcher;
  ngControl;
  formField;
  constructor(_defaultMatcher, directive, _parentFormGroup, _parentForm, _stateChanges) {
    this._defaultMatcher = _defaultMatcher;
    this._parentFormGroup = _parentFormGroup;
    this._parentForm = _parentForm;
    this._stateChanges = _stateChanges;
    if (!directive) {
      this.ngControl = this.formField = null;
    } else if (isSignal(directive.field) && !directive.updateValueAndValidity) {
      this.formField = directive;
      this.ngControl = null;
    } else {
      this.formField = null;
      this.ngControl = directive;
    }
  }
  updateErrorState() {
    const oldState = this.errorState;
    const matcher = this.matcher || this._defaultMatcher;
    let newState;
    if (this.formField) {
      if ((typeof ngDevMode === "undefined" || ngDevMode) && matcher && !matcher.isSignalErrorState) {
        throw new Error("Current error state matcher does not support signal forms. Please implement the `isSignalErrorState` method.");
      }
      newState = matcher?.isSignalErrorState?.(this.formField.field()) ?? false;
    } else {
      const parent = this._parentFormGroup || this._parentForm;
      const control = this.ngControl ? this.ngControl.control : null;
      newState = matcher?.isErrorState(control, parent) ?? false;
    }
    if (newState !== oldState) {
      this.errorState = newState;
      this._stateChanges.next();
    }
  }
};

export {
  ShowOnDirtyErrorStateMatcher,
  ErrorStateMatcher,
  _ErrorStateTracker
};
//# sourceMappingURL=chunk-QQB5ANMA.js.map
