import { appRegEx } from '../constant/defaults';
import { ITplAttr, cliTypes, IParsedAttrs } from '../interface';
import ColorConsole from './colorConsole';

export function mapStringToAttributes(attrsStr: string): ITplAttr[] {
	return attrsStr.split(',').reduce((acc, curr) => {
		const [attribute = '', dataType = ''] = curr.split(':');

		if (!appRegEx.jsPropName.test(attribute)) {
			ColorConsole.yellow(`Skipping ${curr} since ${attribute} are not valid javascript Property Name`);
		} else if (!appRegEx.appDataType.test(dataType)) {
			ColorConsole.yellow(`Skipping ${curr} since ${dataType} are not valid dataType`);
		} else {
			acc.push({ attribute, dataType });
		}

		return acc;
	}, []);
}

export function getAttributesKeys(attributes: ITplAttr[]): string[] {
	return attributes.map(({ attribute }) => attribute);
}

export function getAttributesDataTypes(attributes: ITplAttr[]): cliTypes[] {
	return attributes.map(({ dataType }) => dataType);
}

export function attributesParse(attrsStr: string): IParsedAttrs {
	const attributes = mapStringToAttributes(attrsStr);
	const attrKeys = getAttributesKeys(attributes);
	const dataTypes = getAttributesDataTypes(attributes);

	return { attributes, attrKeys, dataTypes };
}
