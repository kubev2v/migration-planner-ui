import React, { useState, useEffect } from 'react';
import type { AgentApiInterface } from "@migration-planner-ui/agent-client/apis";
import { useInjection } from '@migration-planner-ui/ioc';
import { Symbols } from '#/main/Symbols';
import { StatusReply } from '@migration-planner-ui/agent-client/models';

export const AgentUIVersion: React.FC = () => {
    const agentApi = useInjection<AgentApiInterface>(Symbols.AgentApi);
    const [versionInfo, setVersionInfo] = useState<StatusReply | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVersion = async ():Promise<void> => {
            try {
                const statusReply = await agentApi.getAgentVersion();
                setVersionInfo(statusReply);
            } catch (err) {
                console.error('Error fetching agent version:', err);
                setError('Error fetching version');
            }
        };

        fetchVersion();
    }, [agentApi]);

    if (error) {
        return <div data-testid="agent-api-lib-version" hidden>Error: {error}</div>;
    }

    if (!versionInfo) {
        return <div data-testid="agent-api-lib-version" hidden>Loading...</div>;
    }

    return (
        <div data-testid="agent-api-lib-version" hidden>      
           {versionInfo.statusInfo}
        </div>
    );
};