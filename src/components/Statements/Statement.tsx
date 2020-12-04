/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { DEFAULT_LANGUAGE, getSelectedLanguage } from 'store/languages';
import { Answer, Statement } from 'store/statements';
import { Result, setResult } from 'store/results';
import { useTranslations } from 'i18n';

type StatementProps = {
  statement?: Statement;
  answered?: Answer;
};

const StatementCmp = ({ statement, answered }: StatementProps) => {
  const dispatch = useDispatch();
  const language = useSelector(getSelectedLanguage);
  const { t } = useTranslations();

  const handleAnswer = (answerType: Answer) => {
    if (!!statement && !answered) {
      const result: Result = {
        statementId: statement.statementId,
        answerId: answerType,
        category: statement.category,
      };
      dispatch(setResult(result));
    }
  };

  return (
    <div className="card question-card">
      <div className="question-card-content">
        <p>
          {statement?.statement[language.id] ||
            statement?.statement[DEFAULT_LANGUAGE]}
        </p>
      </div>
      <div className="question-card-label">
        {t('statementsHowMuchDoesThis')}
      </div>
      <div className="question-card-buttons">
        <button
          className={classNames('btn btn-1', {
            active: answered === Answer.NotAtAll,
          })}
          disabled={answered != null ? true : undefined}
          onClick={() => handleAnswer(Answer.NotAtAll)}
        >
          {t('statementsNotAtAll')}
        </button>
        <button
          className={classNames('btn btn-2', {
            active: answered === Answer.Somewhat,
          })}
          disabled={answered != null ? true : undefined}
          onClick={() => handleAnswer(Answer.Somewhat)}
        >
          {t('statementsSomewhat')}
        </button>
        <button
          className={classNames('btn btn-3', {
            active: answered === Answer.VeryMuch,
          })}
          disabled={answered != null ? true : undefined}
          onClick={() => handleAnswer(Answer.VeryMuch)}
        >
          {t('statementsVeryMuch')}
        </button>
        <div className="separator" />
        <button
          className={classNames('btn btn-4', {
            active: answered === Answer.DoesntApply,
          })}
          disabled={answered != null ? true : undefined}
          onClick={() => handleAnswer(Answer.DoesntApply)}
        >
          {t('statementsDoesNotApply')}
        </button>
      </div>
      <ul className="question-card-tags">
        {statement?.tags &&
          statement?.tags.map((tag: string, index: number) => (
            <li key={index}>{tag}</li>
          ))}
      </ul>
    </div>
  );
};

export default memo(StatementCmp);
