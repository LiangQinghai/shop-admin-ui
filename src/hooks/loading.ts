import { ref } from "vue";

export const useLoading = (initValue: boolean = false) => {
	const loading = ref(initValue);
	const setLoading = (value: boolean) => {
		loading.value = value;
	};
	const toggle = () => {
		loading.value = !loading.value;
	};
	return {
		loading,
		setLoading,
		toggle
	};
};
