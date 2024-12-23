export const api = {
  async request(endpoint, options = {}) {
    const defaultOptions = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/api/${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Something went wrong");
    }

    return response.json();
  },

  auth: {
    async register(email, password) {
      return api.request("auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },

    async login(email, password) {
      return api.request("auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    },

    async logout() {
      return api.request("auth/logout", {
        method: "POST",
      });
    },

    async getMe() {
      return api.request("auth/me", {
        method: "GET",
      });
    },
  },

  jobs: {
    async getAll() {
      return api.request("jobs");
    },

    async create(jobData) {
      return api.request("jobs", {
        method: "POST",
        body: JSON.stringify(jobData),
      });
    },

    async getMyJobs() {
      return api.request("my-jobs");
    },

    async deleteJob(jobId) {
      return api.request("my-jobs", {
        method: "DELETE",
        body: JSON.stringify({ job_id: jobId }),
      });
    },
  },

  applications: {
    async getAll() {
      return api.request("applications");
    },

    async submit(applicationData) {
      return api.request("applications", {
        method: "POST",
        body: JSON.stringify(applicationData),
      });
    },
  },
};