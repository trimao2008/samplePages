import React, { Fragment, useEffect, useState } from 'react';
import { LaunchDarklyApi } from '../launchdarkly/LaunchDarklyApi';
import { LaunchDarkly } from '../launchdarkly/LaunchDarkly';

function HomePage() {

    const [ldItems, setLdItems] = useState<LaunchDarkly>();
    const [loading, setLoading] = useState(Boolean);
    const [filterkey, setFilterKey] = useState(String);

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

    const handleFilter = (event: any) => {
        setFilterKey(event.target.value);
    }

    return (
        <Fragment>
            <div>
                {!loading && (
                    <div>
                        <span>Filter: </span>
                        <input name='filter' placeholder='input your flag name or key' onChange={handleFilter} />
                        <table>
                            <tr>
                                <th>Flag Name</th>
                                <th>Status</th>
                                <th>Description</th>
                            </tr>
                            {ldItems?.items?.filter((item) => item.key.includes(filterkey)).map((item) =>
                                <tr>
                                    <td>{item.key}</td>
                                    <td>
                                        <input type="checkbox" name={item.key} id={item.key} checked={item.environments['sit-1'].on} onChange={() => { }} />
                                    </td>
                                    <td>{item.description}</td>
                                </tr>
                            )}
                        </table>
                    </div>)
                }
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