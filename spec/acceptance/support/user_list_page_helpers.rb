# frozen_string_literal: true

module UserListPageHelper
  def page_has_basic_text
    expect(page).to have_content('County:')
  end

  def page_has_user_list_headers
    expect(page.body).to match(
      /Manage Users.*County:.*Full Name.*Status.*Last Log in.*CWS Login.*Office Name.*Role/
    )
  end

  def page_count_users
    page.all('.rt-tr-group a').count
  end

  def expect_sorted_list(list)
    expect(list).to eq(list)
  end

  def users_on_page
    els = page.all('.rt-tr-group a').to_a
    els.map(&:text)
  end

  def first_user_link
    # first cell contains the link
    first_user.first.find('a')
  end

  def table_cells
    %i[full_name status last_log_in cws_login office_name role]
  end

  def first_user
    page.find('.rt-table').first('.rt-tr-group').all('.rt-td')
  end

  def second_user
    page.find('.rt-table').all('.rt-tr-group')[1].all('.rt-td')
  end

  def second_user_link
    second_user.first.find('a')
  end

  def text_values(user_row)
    user_hash = {}
    user_row.zip(table_cells) { |user_value, cell_name| user_hash[cell_name] = user_value.text }
    user_hash
  end

  def search_users(user_name)
    last_name = user_name.match(/([^,]*),/)[1]
    puts "search for #{last_name}"

    fill_in 'searchLastName', with: last_name
    click_on 'Search'
  end

  def expect_valid_role(user_row)
    valid_roles = ['CWS Worker', 'County Administrator', 'CALS External Worker',
                   'State Administratoe',
                   'Office Administrator']
    expect(valid_roles).to include user_row[:role]
  end
end
