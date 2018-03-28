/**************************************************************************************
Apex Class Name    : Accounts
Version            : 1.0
Created Date       : July 16 2017
Function           :
Modification Log   :
------------------------------------------------------------------------------
 * Developer                   Date                   Description
 * ----------------------------------------------------------------------------
 * Suresh S                  07/16/2017              Original Version
*******************************************************************************/
public class Accounts {

    public static void onBeforeInsert(List<SObject> newItems) {
    }

    public static void onBeforeUpdate(List<Account> oldAccountList, List<Account> newAccountList) {
        AccountsHelper.updateUnSubscribeFields(Trigger.new);

    }

    public static void onBeforeDelete(Map<Id, SObject> oldItems) {
    }

    public static void onAfterInsert(Map<Id, SObject> newItems) {

    }

    public static void onAfterUpdate(Map<Id, SObject> newItems, Map<Id, SObject> oldItems) {
        AccountsHelper.setDefaultLetterAndLabelOnOpportunities((List<Account>)newItems.values(), (Map<Id, Account>)oldItems);
        if (!OpportunitiesHelper.isActiveChanged) {
            AccountsHelper.saveAccountInformation((Map<Id,Account>)newItems,(Map<Id,Account>)oldItems);
        }
        //AccountsHelper.saveAccountInformation();
    }

    public static void onAfterDelete(Map<Id, SObject> oldItems) {
        AccountsHelper.retrieveAccountsDeletedByMerge((Map<Id, Account>)oldItems);
    }

    public static void onAfterUndelete(Map<Id, SObject> oldItems) {
    }

}