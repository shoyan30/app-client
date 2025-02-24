import { fetchBranches, deleteBranch } from "@/services/branchService";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
    setup() {
        const branches = ref([]);
        const router = useRouter();

        const loadBranches = async () => {
            try {
                var resp = await fetchBranches();
                if(resp.SUCCESS){
                    branches.value = resp.EQResult[0].DynamicData
                }
            } catch (error) {
                console.error("Failed to load branches", error);
            }
        };

        const navigateToList = () => {
            loadBranches();
        };

        const navigateToAdd = () => {
            router.push("/setup/branch/add");
        };

        const editBranch = (branch) => {
            router.push(`/setup/branch/edit/${branch.id}`);
        };

        const removeBranch = async (id) => {
            if (confirm("Are you sure you want to delete this branch?")) {
                try {
                    await deleteBranch(id);
                    loadBranches();
                } catch (error) {
                    console.error("Failed to delete branch", error);
                }
            }
        };

        onMounted(loadBranches);

        return { branches, navigateToAdd, editBranch, removeBranch };
    },
};
