import type { InjectionKey, Ref } from 'vue'
import type { RValueOrKey } from '../common/key'

interface CarouselItemData {
  value: RValueOrKey,
}

export const modelInjection: InjectionKey<Ref<RValueOrKey | undefined>> = Symbol('RCarousel#model')
export const itemsInjection: InjectionKey<CarouselItemData[]> = Symbol('RCarousel#items')
