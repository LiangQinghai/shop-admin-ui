import { PageDTO, ResultData } from "@/api/types";
import { TableColumnData } from "@arco-design/web-vue";
import { KeyValue } from "@/types/global";

export interface QueryTableDefine {
	title: string;
	queryApi(page: PageDTO): Promise<ResultData<Array<any>>>;
	addFunc(): void;
	tableColumns: TableColumnData[];
	searchDefine?: QueryTableSearchFormDefine[];
}

export enum QueryTableSearchFormInputType {
	INPUT_STRING,
	INPUT_NUMBER,
	SELECT,
	DATETIME_PICKER,
	DATETIME_RANGE_PICKER,
	DATE_PICKER,
	DATE_RANGE_PICKER
}

export interface QueryTableSearchFormDefine {
	queryField: string | string[];
	label: string;
	placeholder?: string;
	inputType: QueryTableSearchFormInputType;
	inputValue?: KeyValue[];
}
