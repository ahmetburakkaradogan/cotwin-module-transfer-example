import {AbstractType, Injectable, InjectFlags, InjectionToken, Injector, Type} from '@angular/core';

@Injectable()
export class StaticInjectorService {

    private static injector: Injector;

    public static init(injector: Injector): void {
        StaticInjectorService.injector = injector;
    }

    public static get<T>(token: Type<T> | AbstractType<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T {
        return StaticInjectorService.injector.get(token, notFoundValue, flags);
    }

}
