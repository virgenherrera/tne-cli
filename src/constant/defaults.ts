export const rwFilePerm = parseInt('0666', 8);
export const rwxFilePerm = parseInt('0755', 8);

export const appRegEx = {
	moduleName: /^[a-z]{1}\w+$/i,
	appName: /[a-z0-9-_]/i,
	jsPropName: /^[a-z_]{1}\w+$/i,
	word: /^\w+$/i,
	appDataType: /^(string|number|date|boolean)$/i,
};

export const DEFAULT_ATTRIBUTES = 'stringAttr:string,numberAttr:number,dateAttr:date,booleanAttr:boolean';

export const projectRootFolder = {
	vscode: '.vscode',
	build: 'build',
	certs: 'certs',
	config: 'config',
	pmCollection: 'postmanCollection',
	public: 'public',
	readmeFiles: 'readmeFiles',
	src: 'src',
	test: 'test',
	views: 'views',
};

export const projectSrcFolder = {
	controller: 'controller',
	handler: 'handler',
	lib: 'lib',
	middleware: 'middleware',
	model: 'model',
	poco: 'poco',
	repository: 'repository',
	config: 'config',
	validator: 'validator',
};

export const projectHandlerFolder = {
	realTime: 'realTime',
	rendered: 'rendered',
	rest: 'rest',
};

export const COMPLEMENTARY_DESCRIPTION = `

Notice: some of the commands may accept the [attributes] parameters in that case you can provide them with the following syntax:
firstProp:dataType,secondProp:dataType, ... ,nthProp:dataType

example:
$ controller module name:string,lastName:string,email:string,dob:date,active:boolean
`;
