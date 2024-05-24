import React, { Fragment, useEffect, useState } from 'react';
import { LaunchDarklyApi } from '../launchdarkly/LaunchDarklyApi';
import { LaunchDarkly } from '../launchdarkly/LaunchDarkly';

function HomePage() {

    const [ldItems, setLdItems] = useState<LaunchDarkly>();
    const [loading, setLoading] = useState(Boolean);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await LaunchDarklyApi.get('hlex', 'sit-1');
                setLdItems(new LaunchDarkly(data));
            } catch (e) {
                if (e instanceof Error) {
                    console.log(e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    return (
        <Fragment>
            <div>
                {!loading && (<table>
                    <tr>
                        <th>Flag Name</th>
                        <th>Status</th>
                        <th>Description</th>
                    </tr>
                    {ldItems?.items?.filter((item) => item.tags.some((tag) => ['Saigon_Squad', 'Saigon'].includes(tag))).map((item) =>
                        <tr>
                            <td>{item.key}</td>
                            <td>
                                <input type="checkbox" name={item.key} id={item.key} checked={item.environments['sit-1'].on} onChange={() => {}} />
                            </td>
                            <td>{item.description}</td>
                        </tr>
                    )}
                </table>)}
            </div>
            {loading && (
                <div className="top-center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}

        </Fragment>
    );
}

export default HomePage;