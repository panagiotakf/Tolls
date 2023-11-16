import argparse
import json
import csv
import requests
from datetime import date
from pathlib import Path
import sys
import res

def main():
    parser = argparse.ArgumentParser()
    subs = parser.add_subparsers(help='sub-command help')

    #admin
    admin_parser = subs.add_parser('admin', help='Admin passes update')
    admin_parser.add_argument('--passupd', action = "store_true", help='Upload CSV file')
    admin_parser.add_argument('--source',help="CSV file to be uploaded",required=True)
    admin_parser.set_defaults(func=res.admin)
    #healthcheck
    healthcheck_parser = subs.add_parser('healthcheck', help='This is a healthcheck')
    healthcheck_parser.set_defaults(func=res.healthcheck)
    #resetpasses
    respass_parser = subs.add_parser('resetpasses', help='Reset passes')
    respass_parser.set_defaults(func=res.resetpasses)
    #resetvehicles
    resveh_parser = subs.add_parser('resetvehicles', help='Reset vehicles')
    resveh_parser.set_defaults(func=res.resetvehicles)
    #resetstations
    resst_parser = subs.add_parser('resetstations', help='Reset stations')
    resst_parser.set_defaults(func=res.resetstations)
    #passesperstation
    pps_parser = subs.add_parser('passesperstation', help='Passes at a specific station')
    pps_parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
    pps_parser.add_argument('--datefrom', help='Choose start of period', required='TRUE')
    pps_parser.add_argument('--station', help='Choose unique station id', required='TRUE')
    pps_parser.add_argument('--dateto', help='Choose end of period', required='TRUE')
    pps_parser.set_defaults(func=res.passesperstation)
    #passescost
    passescost_parser = subs.add_parser('passescost', help='Passes cost from one operator to another')
    passescost_parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
    passescost_parser.add_argument('--op1', help='Choose unique op1 id', required='TRUE')
    passescost_parser.add_argument('--op2', help='Choose unique op2 id', required='TRUE')
    passescost_parser.add_argument('--datefrom', help='Choose start of period', required='TRUE')
    passescost_parser.add_argument('--dateto', help='Choose end of period', required='TRUE')
    passescost_parser.set_defaults(func=res.passescost)
    #passesanalysis
    passesanalysis_parser = subs.add_parser('passesanalysis', help='Passes analysis')
    passesanalysis_parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
    passesanalysis_parser.add_argument('--op1', help='Choose unique op1 id', required='TRUE')
    passesanalysis_parser.add_argument('--op2', help='Choose unique op2 id', required='TRUE')
    passesanalysis_parser.add_argument('--datefrom', help='Choose start of period', required='TRUE')
    passesanalysis_parser.add_argument('--dateto', help='Choose end of period', required='TRUE')
    passesanalysis_parser.set_defaults(func=res.passesanalysis)

    #payoff
    payoff_parser = subs.add_parser('payoff', help='Payoff')
    payoff_parser.add_argument('--op1', help='Choose unique op1 id', required='TRUE')
    payoff_parser.add_argument('--op2', help='Choose unique op2 id', required='TRUE')
    payoff_parser.add_argument('--bank', help='Choose bank', required='TRUE')
    payoff_parser.add_argument('--amount', help='Choose amount', required='TRUE')
    payoff_parser.set_defaults(fucn=res.payoff)
    #chargesby
    chargesby_parser = subs.add_parser('chargesby', help='Charges of an operator')
    chargesby_parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
    chargesby_parser.add_argument('--op', help='Choose unique op id', required='TRUE')
    chargesby_parser.add_argument('--datefrom', help='Choose start of period', required='TRUE')
    chargesby_parser.add_argument('--dateto', help='Choose end of period', required='TRUE')
    chargesby_parser.set_defaults(func=res.chargesby)

    #debts
    debts_parser = subs.add_parser('debts', help='Debts of an OP1 to an OP2')
    debts_parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
    debts_parser.add_argument('--op1', help='Choose unique op1 id', required='TRUE')
    debts_parser.add_argument('--op2', help='Choose unique op2 id', required='TRUE')
    debts_parser.add_argument('--datefrom', help='Choose start of period', required='TRUE')
    debts_parser.add_argument('--dateto', help='Choose end of period', required='TRUE')
    debts_parser.set_defaults(func=res.debts)
    #debtanalysis
    debtanalysis_parser = subs.add_parser('debtanalysis', help='Analysis of debts')
    debtanalysis_parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
    debtanalysis_parser.add_argument('--op', help='Choose unique op id', required='TRUE')
    debtanalysis_parser.add_argument('--datefrom', help='Choose start of period', required='TRUE')
    debtanalysis_parser.add_argument('--dateto', help='Choose end of period', required='TRUE')
    debtanalysis_parser.set_defaults(func=res.debtanalysis)
    #lastpayment
    lastpayment_parser = subs.add_parser('lastpayment', help='Last Payment to and operator')
    lastpayment_parser.add_argument('--format', choices=['csv','json'], help='Choose format (json or csv)', required='TRUE')
    lastpayment_parser.add_argument('--op', help='Choose unique op id for credited operator', required='TRUE')
    lastpayment_parser.set_defaults(func=res.lastpayment)

    args = parser.parse_args()


    if hasattr(args, 'func'):
        if args.func.__name__ == 'admin':
            res.admin(args)
        elif args.func.__name__ == 'healthcheck':
            res.healthcheck()
        elif args.func.__name__ == 'resetpasses':
            res.resetpasses()
        elif args.func.__name__ == 'resetstations':
            res.resetstations()
        elif args.func.__name__ == 'resetvehicles':
            res.resetvehicles()
        elif args.func.__name__ == 'passesperstation':
            res.passesperstation(args)
        elif args.func.__name__ == 'passescost':
            res.passescost(args)
        elif args.func.__name__ == 'passesanalysis':
            res.passesanalysis(args)
        elif args.func.__name__ == 'payoff':
            res.payoff(args)
        elif args.func.__name__ == 'chargesby':
            res.chargesby(args)
        elif args.func.__name__ == 'debts':
            res.debts(args)
        elif args.func.__name__ == 'debtanalysis':
            res.debtanalysis(args)
        elif args.func.__name__ == 'lastpayment':
            res.lastpayment(args)

        else:
            parser.print_help()
            sys.exit(2)

if __name__ == '__main__':
    main()
