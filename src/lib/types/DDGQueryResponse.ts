type DDGQueryResponse = {
	AbstractSource: string;
	AbstractURL: string;
	Redirect: string;
	Image: string;
	RelatedTopics: { Icon: { URL: string } }[];
};
export default DDGQueryResponse;
