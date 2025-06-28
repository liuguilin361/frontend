class Api {
    private jwt: string | null = null;

    isLoggedIn(): boolean {
        return !!this.jwt;
    }

    /**
     * Sets the JWT token for authentication
     * @param token - The JWT token
     */
    setToken(token: string | null): void {
        this.jwt = token;
    }

    /**
     * Generates headers for HTTP requests.
     * @param contentType - Optional content type for the request.
     * @returns Headers object.
     */
    headers(contentType?: string): Record<string, string> {
        const headers: Record<string, string> = {
            Accept: "application/json",
        };

        if (this.jwt) {
            headers.Authorization = `Bearer ${this.jwt}`;
        }

        if (contentType) {
            headers["Content-Type"] = contentType;
        }

        return headers;
    }

    /**
     * Sends a GET request and returns the response as JSON.
     * @param url - The URL to send the request to.
     * @returns Promise resolving to the parsed JSON response.
     * @throws Error if response is not OK or cannot be parsed as JSON.
     */
    async getJson<T>(url: string): Promise<T> {
        const opts = {
            method: "GET",
            headers: this.headers(),
        };
        return fetch(url, opts).then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
    }

    /**
     * Sends a POST request with JSON data and returns the response as JSON.
     * @param url - The URL to send the request to.
     * @param data - The data to send in the request body.
     * @returns Promise resolving to the parsed JSON response or null if no content.
     */
    async postJson<T>(url: string, data: Record<string, unknown>): Promise<T> {
        const opts = {
            method: "POST",
            headers: this.headers("application/json"),
            body: JSON.stringify(data),
        };

        return fetch(url, opts).then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }

            if (res.status !== 204) {
                return res.json();
            }

            return null;
        });
    }

    async patchJson<T>(
        url: string,
        data: Record<string, unknown>,
    ): Promise<Record<string, T>> {
        const opts = {
            method: "PATCH",
            headers: this.headers("application/json"),
            body: JSON.stringify(data),
        };

        const res = await fetch(url, opts);
        if (!res.ok) {
            throw new Error(`${res.status}`);
        }
        return await res.json();
    }

    /**
     * Sends a PUT request with JSON data and returns the response as JSON.
     * @param url - The URL to send the request to.
     * @param data - The data to send in the request body.
     * @returns Promise resolving to the parsed JSON response or null if no content.
     */
    async putJson<T>(url: string, data: Record<string, unknown>): Promise<T> {
        const opts = {
            method: "PUT",
            headers: this.headers("application/json"),
            body: JSON.stringify(data),
        };

        return await fetch(url, opts).then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
            return res.json();
        });
    }

    /**
     * Sends a DELETE request
     * @param url - The URL to send the request to.
     * @returns Promise resolving to the parsed JSON response or null if no content.
     */
    async delete(url: string): Promise<void> {
        const opts = {
            method: "DELETE",
            headers: this.headers(),
        };
        return fetch(url, opts).then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        });
    }

    async getInstalledAddon<T>(addonId: string): Promise<T> {
        return await this.getJson(`/addons/${encodeURIComponent(addonId)}`);
    }

    async getInstalledAddons<T>(): Promise<Record<string, T>> {
        return await this.getJson("/addons");
    }

    /**
     * Fetches addon configuration from the API.
     * @param addonId - The ID of the addon.
     * @returns Promise resolving to the addon config.
     */
    async getAddonConfig(addonId: string): Promise<Record<string, unknown>> {
        return this.getJson(`/addons/${encodeURIComponent(addonId)}/config`);
    }

    setAddonConfig<T>(
        addonId: string,
        config: Record<string, unknown>,
    ): Promise<Record<string, T>> {
        return this.putJson(`/addons/${encodeURIComponent(addonId)}/config`, {
            config,
        });
    }

    /**
     * Enables or disables an addon.
     * @param addonId - The ID of the addon.
     * @param enabled - Whether to enable or disable the addon.
     * @returns Promise resolving to the response or null if no content.
     */
    async setAddonSetting(
        addonId: string,
        enabled: boolean,
    ): Promise<Record<string, boolean>> {
        return this.putJson(`/addons/${encodeURIComponent(addonId)}`, {
            enabled,
        });
    }

    async installAddon<T>(
        addonId: string,
        addonUrl: string,
        addonChecksum: string,
    ): Promise<T> {
        return (await this.postJson("/addons", {
            id: addonId,
            url: addonUrl,
            checksum: addonChecksum,
        }))!;
    }

    /**
     * Deletes an addon.
     * @param addonId - The ID of the addon.
     * @returns Promise resolving to the response or null if no content.
     */
    async uninstallAddon(addonId: string): Promise<void> {
        return this.delete(`/addons/${encodeURIComponent(addonId)}`);
    }

    async updateAddon<T>(
        addonId: string,
        addonUrl: string,
        addonChecksum: string,
    ): Promise<Record<string, T>> {
        return this.patchJson(`/addons/${encodeURIComponent(addonId)}`, {
            url: addonUrl,
            checksum: addonChecksum,
        });
    }

    getAddonsInfo<T>(): Promise<Record<string, T>> {
        return this.getJson("/settings/addonsInfo");
    }

    /**
     * Fetches things from the API.
     * @returns Promise resolving to an object of thing descriptions.
     */
    async getThings<T>(): Promise<Record<string, T>> {
        return this.getJson("/things");
    }

    /**
     * Fetches a specific thing by ID from the API.
     * @param thingId - The ID of the thing to fetch.
     * @returns Promise resolving to the thing description.
     */
    async getThing<T>(thingId: string): Promise<T> {
        return this.getJson<T>(`/things/${encodeURIComponent(thingId)}`);
    }

    async setThingLayoutIndex(
        thingId: string,
        index: number,
    ): Promise<Record<string, unknown>> {
        return this.patchJson(`/things/${encodeURIComponent(thingId)}`, {
            layoutIndex: index,
        });
    }

    async setThingGroup(
        thingId: string,
        groupId: string | null,
    ): Promise<Record<string, unknown>> {
        groupId = groupId || "";
        return this.patchJson(`/things/${encodeURIComponent(thingId)}`, {
            group: groupId,
        });
    }

    async setThingGroupAndLayoutIndex(
        thingId: string,
        groupId: string | null,
        index: number,
    ): Promise<Record<string, unknown>> {
        groupId = groupId || "";
        return this.patchJson(`/things/${encodeURIComponent(thingId)}`, {
            group: groupId,
            layoutIndex: index,
        });
    }

    async setThingFloorplanPosition(
        thingId: string,
        x: number,
        y: number,
    ): Promise<Record<string, unknown>> {
        return this.patchJson(`/things/${encodeURIComponent(thingId)}`, {
            floorplanX: x,
            floorplanY: y,
        });
    }

    async setThingCredentials(
        thingId: string,
        data: Record<string, unknown>,
    ): Promise<Record<string, unknown>> {
        const body: Record<string, unknown> = {
            thingId,
        };

        if (data.hasOwnProperty("pin")) {
            body.pin = data.pin;
        } else {
            body.username = data.username;
            body.password = data.password;
        }

        return this.patchJson("/things", body);
    }

    /**
     * Adds a new thing to the API.
     * @param description - The thing to add.
     * @returns Promise resolving to the response or null if no content.
     */
    async addThing<T>(description: Record<string, unknown>): Promise<T> {
        return (await this.postJson("/things", description))!;
    }

    async addWebThing<T>(url: string): Promise<T> {
        return (await this.postJson("/new_things", {url}))!;
    }

    /**
     * Fetches new things from the API.
     * @returns Promise resolving to an object of new thing descriptions.
     */
    getNewThings<T>(): Promise<Array<T>> {
        return this.getJson<Array<T>>("/new_things");
    }

    async removeThing(thingId: string): Promise<void> {
        return this.delete(`/things/${encodeURIComponent(thingId)}`);
    }

    async updateThing<T>(
        thingId: string,
        updates: Record<string, unknown>,
    ): Promise<T> {
        return this.putJson(`/things/${encodeURIComponent(thingId)}`, updates);
    }

    getGroups<T>(): Promise<Record<string, T>> {
        return this.getJson("/groups");
    }

    getGroup<T>(groupId: string): Promise<Record<string, T>> {
        return this.getJson(`/groups/${encodeURIComponent(groupId)}`);
    }

    setGroupLayoutIndex(
        groupId: string,
        index: number,
    ): Promise<Record<string, unknown>> {
        return this.patchJson(`/groups/${encodeURIComponent(groupId)}`, {
            layoutIndex: index,
        });
    }

    async addGroup<T>(
        description: Record<string, unknown>,
    ): Promise<Record<string, T>> {
        return (await this.postJson("/groups", description))!;
    }

    async removeGroup(groupId: string): Promise<void> {
        return this.delete(`/groups/${encodeURIComponent(groupId)}`);
    }

    async updateGroup<T>(
        groupId: string,
        updates: Record<string, unknown>,
    ): Promise<T> {
        return this.putJson(`/groups/${encodeURIComponent(groupId)}`, updates);
    }

    startPairing<T>(timeout: number): Promise<Record<string, T>> {
        return this.postJson("/actions/pair", {timeout})!;
    }

    cancelPairing(actionUrl: string): Promise<void> {
        return this.delete(actionUrl);
    }

    getExtensions<T>(): Promise<Record<string, T>> {
        return this.getJson('/extensions');
    }


    getRules(): Promise<Record<string, unknown>> {
        return this.getJson("/rules");
    }

    getRule(ruleId: string): Promise<Record<string, unknown>> {
        return this.getJson(`/rules/${encodeURIComponent(ruleId)}`);
    }

    async addRule(
        description: Record<string, unknown>,
    ): Promise<Record<string, unknown>> {
        return (await this.postJson("/rules", description))!;
    }

    updateRule(
        ruleId: string,
        description: Record<string, unknown>,
    ): Promise<Record<string, unknown>> {
        return this.putJson(
            `/rules/${encodeURIComponent(ruleId)}`,
            description,
        );
    }

    deleteRule(ruleId: string): Promise<void> {
        return this.delete(`/rules/${encodeURIComponent(ruleId)}`);
    }
}

const instance = new Api();
export default instance;

// 将类挂载到 window（需先判断环境）
if (typeof window !== 'undefined') {
    window.API = instance;
}
