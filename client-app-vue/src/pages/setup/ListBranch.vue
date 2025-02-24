<template>
  <div class="card mb-4">
    <div class="card-status-top bg-blue"></div>
    <div class="card-header">
      <h3 class="card-title">Branch</h3>
      <div class="card-actions">
        <div class="btn-group w-100" role="group">
          <button type="button" class="btn btn-blue" @click="navigateToList">
            <i class="fas fa-rotate icon"></i> Refresh
          </button>
          <div class="btn-group" role="group">
            <button
              class="btn dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              More
            </button>
            <div class="dropdown-menu">
              <button
                class="dropdown-item"
                data-bs-toggle="offcanvas"
                href="#page-entry-branch"
                role="button"
                aria-controls="page-entry-branch"
              >
                <i class="fa fa-plus m-1"></i> Create
              </button>
              <button
                class="dropdown-item"
                data-id="crm_c1"
                onclick="AppGoShowModal('app-page-help-content',this);"
              >
                <i class="far fa-question-circle m-1"></i> Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body table-responsive p-0">
      <table id="table-slots" class="table table-vcenter table-hover">
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>Business Name</th>
            <th>Office Address</th>
            <th>Contact Name</th>
            <th>Contact No</th>
            <th>Email Address</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="branch in branches" :key="branch.Id">
            <td>{{ branch.BranchName }}</td>
            <td>{{ branch.BusinessName }}</td>
            <td>{{ branch.OfficeAddress }}</td>
            <td>{{ branch.ContactName }}</td>
            <td>{{ branch.ContactNo }}</td>
            <td>{{ branch.EmailAddress }}</td>
            <td>{{ new Date(branch.StartDate).toLocaleDateString() }}</td>
            <td>
              <i v-if="branch.IsActive" class="fas fa-circle-check text-green"></i>
              <i v-else class="fas fa-circle-xmark text-danger"></i>
            </td>
            <td>
              <div class="btn-group w-100" role="group">
                <a
                  type="button"
                  class="btn btn-secondary"
                  @click="editBranch(branch)"
                  title="Edit"
                  ><i class="fas fa-edit text-white"></i
                ></a>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></button>
                  <div class="dropdown-menu" style="">
                    <button
                      type="button"
                      class="dropdown-item"
                      title="Delete"
                      @click="removeBranch(branch.Id)"
                    >
                      <i
                        class="fa fa-trash text-danger icon dropdown-item-icon"
                      ></i
                      >Delete
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>





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

<script src="./ListBranch.js"></script>
