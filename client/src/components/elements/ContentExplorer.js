import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import { ContentExplorer } from 'box-ui-elements';
import { ScaleLoader } from 'react-spinners';
import { THEME_COLOR, EXPRESS_SERVER_HOST, EXPRESS_SERVER_PORT, EXPLORER_FOLDER_ID } from '../../Constants';


export default () => {
    const BOX_TOKEN_SERVICE = `http://${EXPRESS_SERVER_HOST}:${EXPRESS_SERVER_PORT}/box/explorer/token-downscope`;
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const fetchToken = async () => {
            setIsLoading(true);
            const result = await axios.get(BOX_TOKEN_SERVICE);
            setToken(result.data.accessToken);
            setIsLoading(false);
        }
        fetchToken();
    }, []);
    if(token) {
        return (
            <Layout>
                <div className="elements">
                <ContentExplorer
                    logoUrl={""}
                    currentFolderId={EXPLORER_FOLDER_ID}
                    token={token}
                    contentPreviewProps={{
                        showAnnotations: true,
                        contentSidebarProps: {
                            detailsSidebarProps: {
                                hasProperties: true,
                                hasNotices: true,
                                hasAccessStats: true,
                                hasClassification: true,
                                hasRetentionPolicy: true,
                                hasVersions: true,
                            },
                            hasActivityFeed: true,
                            hasMetadata: true,
                            hasSkills: true
                        }
                    }}
                />
                </div>
            </Layout>
        );
    }
    else {
        return(
        <Layout>
                <div className="elements">
                    <div className="spinner">
                        <ScaleLoader 
                            color={THEME_COLOR}
                            loading={isLoading}
                        />
                    </div>                
                </div>
            </Layout>
        );
    }
};
