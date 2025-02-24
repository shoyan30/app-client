<template>
<div id="page-entry-branch" class="offcanvas offcanvas-end offcanvas-size-75" tabindex="-1" aria-labelledby="page-entry-branchLabel">
    <div class="card-status-top bg-red"></div>
    <div class="offcanvas-header p-2">
        <h2 class="offcanvas-title col" id="page-entry-branchLabel">{{ isEdit ? "Edit Branch" : "Add Branch" }}</h2>
        <button type="button" class="btn btn-square btn-ghost-danger w-10" data-bs-dismiss="offcanvas" aria-label="Close" onclick="SLOTS.PageGoClear('destroy-child-components',this)"><i class="fas fa-sign-out-alt"></i></button>
    </div>
    <div class="offcanvas-body">
        <form @submit.prevent="save" class="row g-3">
            <input type="hidden" id="Id" value="0" /> @* default as Id use everywhere in this page *@
            <div class="col-md-3">
                <label for="SlotTypeId" class="form-label">Slot Type</label>
                v-model="branch.name"
                <div class="invalid-feedback">Slot Type is required</div>
            </div>
            <div class="col-md-3 pt-2">
                <div class="form-check mt-4">
                    <input class="form-check-input" type="checkbox" id="IsActive" required />
                    <label class="form-check-label" for="IsActive"> Active </label>
                </div>
            </div>
        </form>
    </div>
    <div class="offcanvas-footer">
        <button type="type" class="btn btn-primary" @click="cancel"><i class="fas fa-xmark icon"></i>Cancel</button>
        <button type="submit" class="btn btn-success"><i class="fas fa-save icon"></i>Submit</button>
    </div>
</div>
</template>

<script>
import { saveBranch, fetchBranches } from "@/services/branchService";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
    setup() {
        const branch = ref({ name: "" });
        const router = useRouter();
        const route = useRoute();
        const isEdit = ref(false);

        onMounted(async () => {
            if (route.params.id) {
                isEdit.value = true;
                const allBranches = await fetchBranches();
                const existingBranch = allBranches.find((b) => b.id == route.params.id);
                if (existingBranch) {
                    branch.value = { ...existingBranch };
                }
            }
        });

        const save = async () => {
            try {
                await saveBranch(branch.value);
                router.push("/setup/branch");
            } catch (error) {
                console.error("Failed to save branch", error);
            }
        };

        const cancel = () => {
            router.push("/setup/branch");
        };

        return { branch, save, cancel, isEdit };
    },
};
</script>