import React, { ReactNode } from 'react';
import { useActiveWalletAccount } from '@deriv/api';
import { WalletText } from '../../../../components';
import { WalletGradientBackground } from '../../../../components/WalletGradientBackground';
import { WalletMarketCurrencyIcon } from '../../../../components/WalletMarketCurrencyIcon';
import { TDisplayBalance, TMarketTypes, TPlatforms } from '../../../../types';
import useDevice from '../../../../hooks/useDevice';
import { MarketTypeToTitleMapper, PlatformToTitleMapper } from '../../constants';
import './Success.scss';

type TSuccessProps = {
    description: string;
    displayBalance: TDisplayBalance;
    marketType: TMarketTypes.SortedMT5Accounts;
    platform: TPlatforms.All;
    renderButton: () => ReactNode;
    title: string;
};

const Success: React.FC<TSuccessProps> = ({
    description,
    displayBalance,
    marketType,
    platform,
    renderButton,
    title,
}) => {
    const { data } = useActiveWalletAccount();
    const { isDesktop } = useDevice();
    const isDemo = data?.is_virtual;
    const landingCompanyName = data?.landing_company_name?.toUpperCase();

    const marketTypeTitle =
        marketType === 'all' && Object.keys(PlatformToTitleMapper).includes(platform)
            ? PlatformToTitleMapper[platform]
            : MarketTypeToTitleMapper[marketType];

    return (
        <div className='wallets-success'>
            <WalletGradientBackground
                bodyClassName='wallets-success__info'
                currency={data?.currency || 'USD'}
                hasShine
                theme='grey'
            >
                <div className={`wallets-success__info-badge wallets-success__info-badge--${isDemo ? 'demo' : 'real'}`}>
                    <WalletText color='white' size='2xs' weight='bold'>
                        {isDemo ? 'Demo' : 'Real'}
                    </WalletText>
                </div>
                <WalletMarketCurrencyIcon
                    currency={data?.currency || 'USD'}
                    isDemo={isDemo || false}
                    marketType={marketType}
                    platform={platform}
                />
                <WalletText size='2xs'>
                    {marketTypeTitle} {!isDemo && `(${landingCompanyName})`}
                </WalletText>
                <WalletText color='primary' size='2xs'>
                    {data?.currency} Wallet
                </WalletText>
                <WalletText size='sm' weight='bold'>
                    {displayBalance}
                </WalletText>
            </WalletGradientBackground>
            <WalletText align='center' size='md' weight='bold'>
                {title}
            </WalletText>
            <WalletText align='center' size='sm'>
                {description}
            </WalletText>
            {isDesktop && renderButton()}
        </div>
    );
};

export default Success;