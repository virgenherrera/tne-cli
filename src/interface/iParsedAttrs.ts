import { ITplAttr, cliTypes } from '.';

export interface IParsedAttrs {
	attributes: ITplAttr[];
	attrKeys: string[];
	dataTypes: cliTypes[];
}
