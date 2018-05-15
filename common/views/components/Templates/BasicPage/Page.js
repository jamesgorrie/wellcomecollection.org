// @flow
import {Fragment} from 'react';
import BasicPage from './BasicPage';
import HTMLDate from '../../HTMLDate/HTMLDate';
import type {Page} from '../../../../model/pages';

type Props = {|
  page: Page
|}

const InstallationPage = ({ page }: Props) => {
  const DateInfo = page.datePublished && <HTMLDate date={page.datePublished} />;

  return (
    <BasicPage
      Background={null}
      DateInfo={DateInfo}
      Description={null}
      TagBar={null}
      InfoBar={null}
      title={page.title}
      mainImageProps={null}
      body={page.body}>
      <Fragment>
      </Fragment>
    </BasicPage>
  );
};

export default InstallationPage;