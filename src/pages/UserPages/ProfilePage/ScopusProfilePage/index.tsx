import React from 'react';
import Styled from './style';

const linkScopusProfile = '';

const ScopusProfilePage: React.FC = () => {
    return (
        <Styled>
            <div>
                {linkScopusProfile === '' ? (
                    <section className="scopus-profile container">
                        <button className="btn btn-add-profile">
                            Connect Scopus profile
                        </button>
                        <p>
                            If you have more than one Scopus author profile and/or there are mistakes in your profile, please go to the&nbsp;
                            <a href="https://www.scopus.com/feedback/author/home.uri">
                                Scopus Author Feedback Wizard
                            </a>
                            &nbsp;to request a correction
                        </p>
                    </section>
                ) : (
                    <section className="scopus-profile container">
                        <h3>Link to Scopus profile: </h3>
                        <a href={linkScopusProfile}>
                            {linkScopusProfile}
                        </a>
                    </section>
                )}
            </div>
        </Styled>
    );
};

export default ScopusProfilePage;
