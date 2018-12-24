import {Config} from '../config';
import {isPrimitiveMark} from '../mark';
import {stack} from '../stack';
import {DataMixins} from './base';
import {GenericHConcatSpec, GenericVConcatSpec} from './concat';
import {GenericFacetSpec} from './facet';
import {ExtendedLayerSpec, GenericLayerSpec, NormalizedLayerSpec} from './layer';
import {GenericRepeatSpec} from './repeat';
import {TopLevel} from './toplevel';
import {FacetedCompositeUnitSpec, GenericUnitSpec, NormalizedUnitSpec} from './unit';

export {normalizeTopLevelSpec as normalize} from '../normalize';
export {BaseSpec, DataMixins, LayoutSizeMixins} from './base';
export {
  GenericHConcatSpec,
  GenericVConcatSpec,
  isConcatSpec,
  isHConcatSpec,
  isVConcatSpec,
  NormalizedConcatSpec
} from './concat';
export {GenericFacetSpec, isFacetSpec, NormalizedFacetSpec} from './facet';
export {ExtendedLayerSpec, GenericLayerSpec, isLayerSpec, NormalizedLayerSpec} from './layer';
export {GenericRepeatSpec, isRepeatSpec, NormalizedRepeatSpec} from './repeat';
export {TopLevel} from './toplevel';
export {CompositeUnitSpec, FacetedCompositeUnitSpec, GenericUnitSpec, isUnitSpec, NormalizedUnitSpec} from './unit';

export type GenericSpec<U extends GenericUnitSpec<any, any>, L extends GenericLayerSpec<any>> =
  | U
  | L
  | GenericFacetSpec<U, L>
  | GenericRepeatSpec<U, L>
  | GenericVConcatSpec<U, L>
  | GenericHConcatSpec<U, L>;

export type NormalizedSpec = GenericSpec<NormalizedUnitSpec, NormalizedLayerSpec>;

export type TopLevelFacetedUnitSpec = TopLevel<FacetedCompositeUnitSpec> & DataMixins;
export type TopLevelFacetSpec = TopLevel<GenericFacetSpec<FacetedCompositeUnitSpec, ExtendedLayerSpec>> & DataMixins;

export type TopLevelSpec =
  | TopLevelFacetedUnitSpec
  | TopLevelFacetSpec
  | TopLevel<ExtendedLayerSpec>
  | TopLevel<GenericRepeatSpec<FacetedCompositeUnitSpec, ExtendedLayerSpec>>
  | TopLevel<GenericVConcatSpec<FacetedCompositeUnitSpec, ExtendedLayerSpec>>
  | TopLevel<GenericHConcatSpec<FacetedCompositeUnitSpec, ExtendedLayerSpec>>;

export function isStacked(spec: TopLevel<FacetedCompositeUnitSpec>, config?: Config): boolean {
  config = config || spec.config;
  if (isPrimitiveMark(spec.mark)) {
    return stack(spec.mark, spec.encoding, config ? config.stack : undefined) !== null;
  }
  return false;
}
