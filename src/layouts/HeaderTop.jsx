import React from "react";

const HeaderTop = () => {
  return (
    <div>
    <header className="navbar navbar-expand-md d-print-none">
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu"
          aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href=".">
            Home
          </a>
        </div>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item d-none d-md-flex me-3">
            <div className="btn-list">
              <a href="https://github.com/tabler/tabler" className="btn btn-5" target="_blank" rel="noreferrer">
                Source code
              </a>
              <a href="https://github.com/sponsors/codecalm" className="btn btn-6" target="_blank" rel="noreferrer">
                Sponsor
              </a>
            </div>
          </div>
          <div className="d-none d-md-flex">
            <a href="?theme=dark" className="nav-link px-0 hide-theme-dark" data-bs-toggle="tooltip"
              data-bs-placement="bottom" aria-label="Enable dark mode" data-bs-original-title="Enable dark mode">
            </a>
            <a href="?theme=light" className="nav-link px-0 hide-theme-light" data-bs-toggle="tooltip"
              data-bs-placement="bottom" aria-label="Enable light mode" data-bs-original-title="Enable light mode">
            </a>
            <div className="nav-item dropdown d-none d-md-flex me-3">
              <a href="#" className="nav-link px-0" data-bs-toggle="dropdown" aria-label="Show notifications">
                <span className="badge bg-red"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Last updates</h3>
                  </div>
                  <div className="list-group list-group-flush list-group-hoverable">
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto"><span className="status-dot status-dot-animated bg-red d-block"></span></div>
                        <div className="col text-truncate">
                          <a href="#" className="text-body d-block">Example 1</a>
                          <div className="d-block text-secondary text-truncate mt-n1">
                            Change deprecated html tags to text decoration classNamees (#29604)
                          </div>
                        </div>
                        <div className="col-auto">
                          <a href="#" className="list-group-item-actions">
                            m1
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto"><span className="status-dot d-block"></span></div>
                        <div className="col text-truncate">
                          <a href="#" className="text-body d-block">Example 2</a>
                          <div className="d-block text-secondary text-truncate mt-n1">
                            justify-content:between ⇒ justify-content:space-between (#29734)
                          </div>
                        </div>
                        <div className="col-auto">
                          <a href="#" className="list-group-item-actions show">
                            m2
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto"><span className="status-dot d-block"></span></div>
                        <div className="col text-truncate">
                          <a href="#" className="text-body d-block">Example 3</a>
                          <div className="d-block text-secondary text-truncate mt-n1">
                            Update change-version.js (#29736)
                          </div>
                        </div>
                        <div className="col-auto">
                          <a href="#" className="list-group-item-actions">
                           m3
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto"><span className="status-dot status-dot-animated bg-green d-block"></span>
                        </div>
                        <div className="col text-truncate">
                          <a href="#" className="text-body d-block">Example 4</a>
                          <div className="d-block text-secondary text-truncate mt-n1">
                            Regenerate package-lock.json (#29730)
                          </div>
                        </div>
                        <div className="col-auto">
                          <a href="#" className="list-group-item-actions">
                            m4
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
              aria-label="Open user menu">
              <span className="avatar avatar-sm"></span>
              <div className="d-none d-xl-block ps-2">
                <div>Paweł Kuna</div>
                <div className="mt-1 small text-secondary">UI Designer</div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a href="#" className="dropdown-item">Status</a>
              <a href="./profile.html" className="dropdown-item">Profile</a>
              <a href="#" className="dropdown-item">Feedback</a>
              <div className="dropdown-divider"></div>
              <a href="./settings.html" className="dropdown-item">Settings</a>
              <a href="./sign-in.html" className="dropdown-item">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    </div>
  );
};
export default HeaderTop;