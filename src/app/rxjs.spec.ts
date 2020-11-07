import {
  asyncScheduler,
  BehaviorSubject,
  from,
  NEVER,
  noop,
  of,
  ReplaySubject,
  Subject,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  distinct,
  distinctUntilChanged,
  filter,
  first,
  map,
  take,
  tap, throttleTime,
} from 'rxjs/operators';
import { fakeAsync, tick as _tick } from '@angular/core/testing';

fdescribe('RxJS', () => {
  /**
   * The following spies will act like subscribe handlers:
   * subject.subscribe(
   *   (value: T) => void, // nextSpy
   *   (error: Error) => void, // errorSpy
   *   () => void, // completeSpy
   * )
   */
  let nextSpy: jasmine.Spy;
  let errorSpy: jasmine.Spy;
  let completeSpy: jasmine.Spy;

  beforeEach(() => {
    nextSpy = jasmine.createSpy();
    errorSpy = jasmine.createSpy();
    completeSpy = jasmine.createSpy();
  });

  describe('Subject (HOT)', () => {
    let subject: Subject<number>;

    beforeEach(() => {
      subject = new Subject<number>();
    });

    it('should subscribe', () => {
      /**
       * Start listening for values
       */
      const subscription = subject.subscribe();

      expect(subscription.closed).toBeFalse();
    });

    it('should unsubscribe', () => {
      /**
       * Start listening for values
       */
      const subscription = subject.subscribe();

      /**
       * Stop listening for values
       */
      subscription.unsubscribe();

      expect(subscription.closed).toBeTrue();
    });

    it('should not emit on subscribe', () => {
      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('should emit a value to subscribers', () => {
      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);
      /**
       * Emit a value
       */
      subject.next(123);

      expect(nextSpy).toHaveBeenCalledWith(123);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit values to subscribers that unsubscribed', () => {
      /**
       * Start listening for values
       */
      const subscription = subject.subscribe(nextSpy);
      /**
       * Stop listening for values
       */
      subscription.unsubscribe();
      /**
       * Emit a value
       */
      subject.next(123);

      expect(nextSpy).not.toHaveBeenCalled();

      expect(subscription.closed).toBeTrue();
    });

    it('should not emit the previous value to new subscribers', () => {
      /**
       * Emit a value
       */
      subject.next(123);
      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('should not complete after an emit', () => {
      /**
       * Start listening for values
       */
      const subscription = subject.subscribe(noop, noop, completeSpy);

      /**
       * Emit a value
       */
      subject.next(123);

      expect(completeSpy).not.toHaveBeenCalled();

      expect(subscription.closed).toBeFalse();
    });

    it('should not complete after unsubscribe', () => {
      /**
       * Start listening for values
       */
      const subscription = subject.subscribe(noop, noop, completeSpy);

      /**
       * Stop listening for values
       */
      subscription.unsubscribe();

      expect(completeSpy).not.toHaveBeenCalled();

      expect(subscription.closed).toBeTrue();
    });

    it('should complete when manually called', () => {
      /**
       * Start listening for values
       */
      const subscription = subject.subscribe(noop, noop, completeSpy);

      /**
       * Complete the subject
       */
      subject.complete();

      expect(completeSpy).toHaveBeenCalledTimes(1);

      expect(subscription.closed).toBeTrue();
    });

    it('should complete when subscribing a completed subject', () => {
      /**
       * Complete the subject
       */
      subject.complete();

      /**
       * Start listening for values
       */
      const subscription = subject.subscribe(noop, noop, completeSpy);

      expect(completeSpy).toHaveBeenCalledTimes(1);

      expect(subscription.closed).toBeTrue();
    });

    it('should not emit any values after complete', () => {
      /**
       * Start listening for values
       */
      const subscription = subject.subscribe(nextSpy, noop, completeSpy);

      /**
       * Complete the subject
       */
      subject.complete();

      expect(completeSpy).toHaveBeenCalledTimes(1);

      expect(subscription.closed).toBeTrue();

      /**
       * Emit a value
       */
      subject.next(123);

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('should not emit any values after error', () => {
      const ERROR = new Error();
      /**
       * Start listening for values
       */
      const subscription = subject.subscribe(nextSpy, errorSpy, noop);

      /**
       * Complete the subject
       */
      subject.error(ERROR);

      expect(errorSpy).toHaveBeenCalledWith(ERROR);
      expect(errorSpy).toHaveBeenCalledTimes(1);

      expect(subscription.closed).toBeTrue();

      /**
       * Emit a value
       */
      subject.next(123);

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('should not complete after error', () => {
      const ERROR = new Error();
      /**
       * Start listening for values
       */
      subject.subscribe(noop, errorSpy, completeSpy);

      /**
       * Emit an error
       */
      subject.error(ERROR);

      /**
       * Complete the subject
       */
      subject.complete();

      expect(errorSpy).toHaveBeenCalledWith(ERROR);
      expect(errorSpy).toHaveBeenCalledTimes(1);

      expect(completeSpy).not.toHaveBeenCalled();
    });

    it('should cast to an observable', () => {
      const observable$ = subject.asObservable();

      expect((observable$ as any).next).toBeUndefined();
      expect((observable$ as any).error).toBeUndefined();
      expect((observable$ as any).complete).toBeUndefined();
    });
  });

  describe('ReplaySubject (HOT)', () => {
    let subject: ReplaySubject<number>;

    beforeEach(() => {
      subject = new ReplaySubject<number>();
    });

    it('should not emit on subscribe if nothing has been emitted', () => {
      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('should emit on subscribe if something has been emitted', () => {
      /**
       * Emit a value
       */
      subject.next(123);

      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(123);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should replay all emits on subscribe', () => {
      /**
       * Emit a value
       */
      subject.next(1);
      /**
       * Emit a value
       */
      subject.next(2);
      /**
       * Emit a value
       */
      subject.next(3);
      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(1);
      expect(nextSpy).toHaveBeenCalledWith(2);
      expect(nextSpy).toHaveBeenCalledWith(3);

      expect(nextSpy).toHaveBeenCalledTimes(3);
    });

    it('should replay emits on subscribe based on buffer size', () => {
      subject = new ReplaySubject<number>(2);
      /**
       * Emit a value
       */
      subject.next(1);
      /**
       * Emit a value
       */
      subject.next(2);
      /**
       * Emit a value
       */
      subject.next(3);
      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(2);
      expect(nextSpy).toHaveBeenCalledWith(3);

      expect(nextSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('BehaviorSubject (HOT)', () => {
    let subject: BehaviorSubject<number>;
    const DEFAULT_VALUE = -1;

    beforeEach(() => {
      subject = new BehaviorSubject<number>(DEFAULT_VALUE);
    });

    it('should emit the default value on subscribe if nothing has been emitted', () => {
      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(DEFAULT_VALUE);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit the last value on subscribe', () => {
      subject.next(123);
      /**
       * Start listening for values
       */
      subject.subscribe(nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(123);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should return the current value', () => {
      subject.next(123);

      expect(subject.getValue()).toBe(123);
    });
  });

  describe('Observables (COLD)', () => {
    const OBSERVABLE_VALUE = 123;
    const observable$ = of(OBSERVABLE_VALUE);

    it('should emit on subscribe', () => {
      observable$.subscribe(nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(OBSERVABLE_VALUE);

      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should complete on subscribe', () => {
      const subscription = observable$.subscribe(noop, noop, completeSpy);

      expect(completeSpy).toHaveBeenCalledTimes(1);

      expect(subscription.closed).toBeTrue();
    });

    it('should error on subscribe', () => {
      const ERROR = new Error();
      const errorObservable$ = throwError(ERROR);

      const subscription = errorObservable$.subscribe(
        noop,
        errorSpy,
        completeSpy
      );

      expect(completeSpy).not.toHaveBeenCalled();

      expect(errorSpy).toHaveBeenCalledWith(ERROR);
      expect(errorSpy).toHaveBeenCalledTimes(1);

      expect(subscription.closed).toBeTrue();
    });

    it('should create an observable of an array', () => {
      of([1, 2, 3]).subscribe(nextSpy, noop, completeSpy);

      expect(nextSpy).toHaveBeenCalledWith([1, 2, 3]);
      expect(nextSpy).toHaveBeenCalledTimes(1);

      expect(completeSpy).toHaveBeenCalled();
    });

    it('should create an observable from an array', () => {
      from([1, 2, 3]).subscribe(nextSpy, noop, completeSpy);

      expect(nextSpy).toHaveBeenCalledWith(1);
      expect(nextSpy).toHaveBeenCalledWith(2);
      expect(nextSpy).toHaveBeenCalledWith(3);

      expect(nextSpy).toHaveBeenCalledTimes(3);

      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('HOT -> COLD', () => {
    let subject: Subject<number>;

    beforeEach(() => {
      subject = new Subject<number>();
    });

    it('should complete after the first value', () => {
      const subscription = subject
        .pipe(first())
        .subscribe(nextSpy, noop, completeSpy);

      subject.next(123);
      subject.next(456);

      expect(nextSpy).toHaveBeenCalledWith(123);
      expect(nextSpy).toHaveBeenCalledTimes(1);

      expect(completeSpy).toHaveBeenCalledTimes(1);

      expect(subscription.closed).toBeTrue();
    });

    it('should complete after taking 2 values', () => {
      subject.pipe(take(2)).subscribe(nextSpy, noop, completeSpy);

      subject.next(123);
      subject.next(456);
      subject.next(789);

      expect(nextSpy).toHaveBeenCalledWith(123);
      expect(nextSpy).toHaveBeenCalledWith(456);

      expect(nextSpy).toHaveBeenCalledTimes(2);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Operators', () => {
    let subject: Subject<number>;

    beforeEach(() => {
      subject = new Subject<number>();
    });

    it('should add 5 to each value', () => {
      subject.pipe(map((n) => n + 5)).subscribe(nextSpy);

      subject.next(123);

      expect(nextSpy).toHaveBeenCalledWith(128);
    });

    it('should accept only even numbers', () => {
      subject.pipe(filter((n) => n % 2 === 0)).subscribe(nextSpy);

      subject.next(123);
      subject.next(124);

      expect(nextSpy).toHaveBeenCalledWith(124);
      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should perform a side-effect (try to avoid these)', () => {
      const sideEffectSpy = jasmine.createSpy();

      subject.pipe(tap(sideEffectSpy)).subscribe();
      subject.next(123);

      expect(sideEffectSpy).toHaveBeenCalledWith(123);
      expect(sideEffectSpy).toHaveBeenCalledTimes(1);
    });

    it('should only accept unique values', () => {
      subject.pipe(distinct()).subscribe(nextSpy);
      subject.next(1);
      subject.next(2);
      subject.next(1);
      subject.next(2);
      subject.next(3);

      expect(nextSpy).toHaveBeenCalledWith(1);
      expect(nextSpy).toHaveBeenCalledWith(2);
      expect(nextSpy).toHaveBeenCalledWith(3);
      expect(nextSpy).toHaveBeenCalledTimes(3);
    });

    it('should only accept values different than the previous value', () => {
      subject.pipe(distinctUntilChanged()).subscribe(nextSpy);
      subject.next(1);
      subject.next(1);
      subject.next(2);
      subject.next(2);
      subject.next(1);
      subject.next(1);

      expect(nextSpy).toHaveBeenCalledWith(1);
      expect(nextSpy).toHaveBeenCalledWith(2);
      expect(nextSpy).toHaveBeenCalledWith(1);
      expect(nextSpy).toHaveBeenCalledTimes(3);
    });

    it('should throw an error if 5 is emitted and break the stream', () => {
      const subscription = subject
        .pipe(
          tap((n) => {
            if (n === 5) {
              throw new Error();
            }
          })
        )
        .subscribe(nextSpy, errorSpy);

      subject.next(1);
      subject.next(5);

      expect(nextSpy).toHaveBeenCalledWith(1);
      expect(nextSpy).toHaveBeenCalledTimes(1);

      expect(errorSpy).toHaveBeenCalledTimes(1);

      expect(subscription.closed).toBeTrue();
    });

    it('should throw an error if 5 is emitted and not break the stream', () => {
      const subscription = subject
        .pipe(
          tap((n) => {
            if (n === 5) {
              throw new Error();
            }
          }),
          catchError((error) => {
            // Do something with this error
            return NEVER;
          })
        )
        .subscribe(nextSpy, errorSpy);

      subject.next(1);
      subject.next(5);

      expect(nextSpy).toHaveBeenCalledWith(1);
      expect(nextSpy).toHaveBeenCalledTimes(1);

      expect(errorSpy).toHaveBeenCalledTimes(0);

      expect(subscription.closed).toBeFalse();
    });
  });

  describe('Asynchronous operators', () => {
    let tick: (milliseconds: number) => void;
    let subject: Subject<number>;

    beforeEach(() => {
      let fakeNow = 0;
      tick = (milliseconds) => {
        fakeNow += milliseconds;
        _tick(milliseconds);
      };

      asyncScheduler.now = () => fakeNow;

      subject = new Subject<number>();
    });

    it('should delay a value/complete', fakeAsync(() => {
      subject.pipe(delay(100)).subscribe(nextSpy, noop, completeSpy);

      subject.next(123);
      subject.complete();

      expect(nextSpy).not.toHaveBeenCalled();
      expect(completeSpy).not.toHaveBeenCalled();

      tick(100);

      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    }));

    it('should not delay an error', fakeAsync(() => {
      subject.pipe(delay(100)).subscribe(noop, errorSpy, noop);

      subject.error(new Error());

      expect(errorSpy).toHaveBeenCalledTimes(1);
    }));

    it('should debounce incoming emits for 100ms', fakeAsync(() => {
      subject.pipe(debounceTime(100)).subscribe(nextSpy, noop, noop);

      subject.next(1); // debounced

      tick(10);

      subject.next(2); // debounced

      tick(90);

      subject.next(3);

      expect(nextSpy).not.toHaveBeenCalled();

      tick(100);

      expect(nextSpy).toHaveBeenCalledWith(3);
      expect(nextSpy).toHaveBeenCalledTimes(1);
    }));

    it('should throttle incoming emits for 100ms', fakeAsync(() => {
      subject.pipe(throttleTime(100)).subscribe(nextSpy, noop, noop);

      subject.next(1);

      expect(nextSpy).toHaveBeenCalledWith(1);

      tick(10);

      subject.next(2); // throttled

      tick(10);

      subject.next(2); // throttled

      tick(80);

      subject.next(3);

      expect(nextSpy).toHaveBeenCalledWith(3);

      tick(100);

      expect(nextSpy).toHaveBeenCalledTimes(2);
    }));
  });
});
